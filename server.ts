import express from 'express';
import { Server, Socket } from "socket.io";
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000, // 60 seconds
  pingInterval: 25000, // 25 seconds
});

type Position = { x: number; y: number };
type Player = {
  id: string;
  position: Position;
  direction: string;
  score: number;
  name: string;
  socketId: string;
  lastActivity: number;
  color: string;
};

const PLAYER_COLORS = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF8000', '#00FF00', '#FF0000', '#0000FF', '#8000FF'];

const players: Map<string, Player> = new Map();
let cheeses: Position[] = [];
let gameInProgress = false;

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;

function generateCheese(): Position {
  return {
    x: Math.floor(Math.random() * GRID_WIDTH),
    y: Math.floor(Math.random() * GRID_HEIGHT)
  };
}

function initializeGame(): void {
  try {
    cheeses = [generateCheese(), generateCheese(), generateCheese()];
    players.forEach((player) => {
      player.position = getStartingPosition(Array.from(players.keys()).indexOf(player.id));
      player.score = 0;
      player.direction = 'right';
    });
    gameInProgress = true;
  } catch (error) {
    console.error('Error initializing game:', error);
    gameInProgress = false;
  }
}

function getStartingPosition(playerIndex: number): Position {
  switch (playerIndex % 4) {
    case 0: return { x: 0, y: 0 };
    case 1: return { x: GRID_WIDTH - 1, y: 0 };
    case 2: return { x: 0, y: GRID_HEIGHT - 1 };
    case 3: return { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 };
    default: return { x: 0, y: 0 };
  }
}

function removePlayer(id: string) {
  players.delete(id);
  if (players.size === 0) {
    gameInProgress = false;
    cheeses = [];
  }
}

function cleanupDisconnectedPlayers() {
  try {
    const now = Date.now();
    players.forEach((player, id) => {
      if (now - player.lastActivity > 10000) {
        removePlayer(id);
      }
    });
  } catch (error) {
    console.error('Error cleaning up disconnected players:', error);
  }
}

setInterval(cleanupDisconnectedPlayers, 5000);

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('playerJoined', ({ id }: { id: string }) => {
    try {
      let player = players.get(id);
      if (player) {
        player.socketId = socket.id;
        player.lastActivity = Date.now();
        socket.emit('reconnected', player);
      } else {
        const startingPosition = getStartingPosition(players.size);
        player = {
          id,
          socketId: socket.id,
          position: startingPosition,
          direction: 'right',
          score: 0,
          name: `Player ${players.size + 1}`,
          lastActivity: Date.now(),
          color: getPlayerColor(players.size)
        };
        players.set(id, player);
      }
      socket.emit('gameState', { gameInProgress, players: Array.from(players.values()), cheeses });
      io.emit('playerConnected', Array.from(players.values()));
    } catch (error) {
      console.error('Error in playerJoined:', error);
      socket.emit('error', 'An error occurred while joining the game');
    }
  });

  socket.on('startGame', () => {
    try {
      if (!gameInProgress) {
        initializeGame();
        io.emit('gameStarted', { players: Array.from(players.values()), cheeses });
      }
    } catch (error) {
      console.error('Error starting game:', error);
      socket.emit('error', 'An error occurred while starting the game');
    }
  });

  socket.on('changeDirection', ({ playerId, direction }: { playerId: string; direction: string }) => {
    try {
      if (gameInProgress) {
        const player = players.get(playerId);
        if (player) {
          player.direction = direction;
          player.lastActivity = Date.now();
          movePlayer(player);
          checkCollisions();
          io.emit('updateGame', { players: Array.from(players.values()), cheeses });
        }
      }
    } catch (error) {
      console.error('Error changing direction:', error);
      socket.emit('error', 'An error occurred while changing direction');
    }
  });

  socket.on('ping', ({ playerId }: { playerId: string }) => {
    try {
      const player = players.get(playerId);
      if (player) {
        player.lastActivity = Date.now();
      }
    } catch (error) {
      console.error('Error handling ping:', error);
    }
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', (reason) => {
    try {
      console.log('User disconnected:', reason);
      const disconnectedPlayer = Array.from(players.values()).find(p => p.socketId === socket.id);
      if (disconnectedPlayer) {
        setTimeout(() => {
          try {
            const player = players.get(disconnectedPlayer.id);
            if (player && player.socketId === socket.id) {
              removePlayer(disconnectedPlayer.id);
              io.emit('playerDisconnected', disconnectedPlayer.id);
              io.emit('playerConnected', Array.from(players.values()));
            }
          } catch (error) {
            console.error('Error handling delayed disconnect:', error);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  });
});

function movePlayer(player: Player): void {
  try {
    switch (player.direction) {
      case 'up':
        player.position.y = (player.position.y - 1 + GRID_HEIGHT) % GRID_HEIGHT;
        break;
      case 'down':
        player.position.y = (player.position.y + 1) % GRID_HEIGHT;
        break;
      case 'left':
        player.position.x = (player.position.x - 1 + GRID_WIDTH) % GRID_WIDTH;
        break;
      case 'right':
        player.position.x = (player.position.x + 1) % GRID_WIDTH;
        break;
    }
  } catch (error) {
    console.error('Error moving player:', error);
  }
}

function checkCollisions(): void {
  try {
    players.forEach(player => {
      const cheeseIndex = cheeses.findIndex(cheese => 
        cheese.x === player.position.x && cheese.y === player.position.y
      );
      if (cheeseIndex !== -1) {
        player.score += 1;
        cheeses.splice(cheeseIndex, 1);
        cheeses.push(generateCheese());
        if (player.score >= 10) {
          io.emit('gameWon', player.id);
          gameInProgress = false;
        }
      }
    });
  } catch (error) {
    console.error('Error checking collisions:', error);
  }
}

function getPlayerColor(playerIndex: number): string {
  return PLAYER_COLORS[playerIndex % PLAYER_COLORS.length];
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});