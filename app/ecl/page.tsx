"use client";

import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;

type Position = { x: number; y: number };
type Player = {
  id: string;
  position: Position;
  direction: string;
  score: number;
};

function RetroNeonLogo() {
  return (
    <div className="mb-4 w-full text-center sm:mb-8">
      <h1 className="text-3xl font-extrabold leading-none tracking-tighter sm:text-5xl">
        <span className="text-neon-yellow neon-glow inline-block animate-pulse">
          ELECTRIC
        </span>{" "}
        <span className="text-neon-yellow neon-glow animation-delay-150 inline-block animate-pulse">
          CHEESE
        </span>{" "}
        <span className="text-neon-yellow neon-glow animation-delay-300 inline-block animate-pulse">
          LAND
        </span>
      </h1>
    </div>
  );
}

function RetroNeonSvg() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      className="mb-4 sm:mb-8"
    >
      <defs>
        <filter id="enhanced-neon-glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#enhanced-neon-glow)">
        <path
          d="M100 10 L130 80 L110 80 L140 190 L70 100 L90 100 L60 10 Z"
          fill="#FFFF00"
          stroke="#FFFF00"
          strokeWidth="4"
        />
        <circle cx="75" cy="45" r="10" fill="#FF00FF" />
        <circle cx="110" cy="60" r="8" fill="#FF00FF" />
        <circle cx="90" cy="140" r="12" fill="#FF00FF" />
      </g>
    </svg>
  );
}

function NeonButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-neon-yellow neon-glow hover:bg-neon-yellow rounded bg-transparent px-4 py-2 text-xl font-bold transition-all duration-300 hover:text-black sm:text-2xl"
    >
      {children}
    </button>
  );
}

export default function MultiplayerRetroNeonElectricCheeseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [cheeses, setCheeses] = useState<Position[]>([]);
  const [playerId] = useState<string>(uuidv4());
  const [gameWon, setGameWon] = useState<boolean>(false);

  const initializeGame = () => {
    const initialCheese: Position = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    };
    setCheeses([initialCheese]);

    setPlayers([
      {
        id: playerId,
        position: {
          x: Math.floor(Math.random() * GRID_WIDTH),
          y: Math.floor(Math.random() * GRID_HEIGHT),
        },
        direction: "right",
        score: 0,
      },
    ]);

    setGameWon(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initializeGame();
    draw(ctx);
  }, [playerId]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameWon) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === playerId
              ? { ...player, direction: getDirectionFromKey(e.key) }
              : player,
          ),
        );
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerId, gameWon]);

  useEffect(() => {
    if (gameWon) return;

    const gameLoop = setInterval(() => {
      movePlayers();
    }, 200);

    return () => clearInterval(gameLoop);
  }, [players, cheeses, gameWon]);

  const getDirectionFromKey = (key: string): string => {
    switch (key.toLowerCase()) {
      case "arrowup":
      case "w":
        return "up";
      case "arrowdown":
      case "s":
        return "down";
      case "arrowleft":
      case "a":
        return "left";
      case "arrowright":
      case "d":
        return "right";
      default:
        return "right";
    }
  };

  const movePlayers = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        let newX = player.position.x;
        let newY = player.position.y;

        switch (player.direction) {
          case "up":
            newY = (newY - 1 + GRID_HEIGHT) % GRID_HEIGHT;
            break;
          case "down":
            newY = (newY + 1) % GRID_HEIGHT;
            break;
          case "left":
            newX = (newX - 1 + GRID_WIDTH) % GRID_WIDTH;
            break;
          case "right":
            newX = (newX + 1) % GRID_WIDTH;
            break;
        }

        const newPosition = { x: newX, y: newY };
        const cheeseIndex = cheeses.findIndex(
          (cheese) => cheese.x === newX && cheese.y === newY,
        );

        if (cheeseIndex !== -1) {
          setCheeses([]);
          setGameWon(true);
          return { ...player, position: newPosition, score: player.score + 10 };
        }

        return { ...player, position: newPosition };
      }),
    );

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        draw(ctx);
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    cheeses.forEach((cheese) => {
      drawNeonCheeseBlock(ctx, cheese.x * CELL_SIZE, cheese.y * CELL_SIZE);
    });

    players.forEach((player) => {
      drawNeonPinkPanther(
        ctx,
        player.position.x * CELL_SIZE,
        player.position.y * CELL_SIZE,
        player.direction,
      );
    });

    if (gameWon) {
      drawWinMessage(ctx);
    }
  };

  const drawNeonCheeseBlock = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) => {
    ctx.fillStyle = "#FFFF00";
    ctx.shadowColor = "#FFFF00";
    ctx.shadowBlur = 10;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

    ctx.fillStyle = "#FFFF66";
    ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + 4, y + 4, 2, 2);
    ctx.fillRect(x + CELL_SIZE - 6, y + CELL_SIZE - 6, 2, 2);

    ctx.shadowBlur = 0;
  };

  const drawNeonPinkPanther = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: string,
  ) => {
    ctx.fillStyle = "#FF69B4";
    ctx.shadowColor = "#FF69B4";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      x + CELL_SIZE / 2,
      y + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    ctx.fillStyle = "#FFC0CB";
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const fluffX = x + CELL_SIZE / 2 + (Math.cos(angle) * CELL_SIZE) / 2;
      const fluffY = y + CELL_SIZE / 2 + (Math.sin(angle) * CELL_SIZE) / 2;
      ctx.beginPath();
      ctx.arc(fluffX, fluffY, CELL_SIZE / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#FFFFFF";
    const eyeOffset = CELL_SIZE / 6;
    let eyeX, eyeY;
    switch (direction) {
      case "up":
        eyeX = x + CELL_SIZE / 2;
        eyeY = y + eyeOffset;
        break;
      case "down":
        eyeX = x + CELL_SIZE / 2;
        eyeY = y + CELL_SIZE - eyeOffset;
        break;
      case "left":
        eyeX = x + eyeOffset;
        eyeY = y + CELL_SIZE / 2;
        break;
      case "right":
        eyeX = x + CELL_SIZE - eyeOffset;
        eyeY = y + CELL_SIZE / 2;
        break;
      default:
        eyeX = x + CELL_SIZE / 2;
        eyeY = y + CELL_SIZE / 2;
    }
    ctx.beginPath();
    ctx.arc(eyeX - eyeOffset, eyeY, CELL_SIZE / 8, 0, Math.PI * 2);
    ctx.arc(eyeX + eyeOffset, eyeY, CELL_SIZE / 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(eyeX - eyeOffset, eyeY, CELL_SIZE / 16, 0, Math.PI * 2);
    ctx.arc(eyeX + eyeOffset, eyeY, CELL_SIZE / 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
  };

  const drawWinMessage = (ctx: CanvasRenderingContext2D) => {
    const width = GRID_WIDTH * CELL_SIZE;
    const height = GRID_HEIGHT * CELL_SIZE;

    // Draw semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, width, height);

    // Draw win message
    ctx.font = "bold 36px Audiowide, cursive";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Outer glow
    ctx.strokeStyle = "#FFFF00";
    ctx.lineWidth = 8;
    ctx.strokeText("YOU WIN!", width / 2, height / 2 - 20);

    // Inner text
    ctx.fillStyle = "#FFFF00";
    ctx.fillText("YOU WIN!", width / 2, height / 2 - 20);

    // Subtext
    ctx.font = "18px Audiowide, cursive";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Click to play again", width / 2, height / 2 + 20);
  };

  const handleCanvasClick = () => {
    if (gameWon) {
      initializeGame();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (gameWon) {
      initializeGame();
      return;
    }

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const newDirection =
        Math.abs(x - centerX) > Math.abs(y - centerY)
          ? x > centerX
            ? "right"
            : "left"
          : y > centerY
            ? "down"
            : "up";

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerId
            ? { ...player, direction: newDirection }
            : player,
        ),
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");

        .text-neon-yellow {
          color: #ffff00;
        }

        .neon-glow {
          text-shadow:
            0 0 7px #ffff00,
            0 0 10px #ffff00,
            0 0 21px #ffff00,
            0 0 42px #ffff00,
            0 0 82px #ffff00,
            0 0 92px #ffff00,
            0 0 102px #ffff00,
            0 0 151px #ffff00;
        }

        body {
          font-family: "Audiowide", cursive;
        }
      `}</style>
      <RetroNeonLogo />
      <RetroNeonSvg />
      <div className="text-neon-yellow neon-glow mb-4 text-sm sm:text-base">
        Connected Players: {players.length}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_WIDTH * CELL_SIZE}
          height={GRID_HEIGHT * CELL_SIZE}
          className="border-neon-yellow neon-glow cursor-pointer rounded-lg border-4 shadow-lg"
          onTouchStart={handleTouchStart}
          onClick={handleCanvasClick}
        />
        {gameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-neon-yellow neon-glow mb-4 text-4xl font-bold">
              WIN!
            </div>
            <NeonButton onClick={initializeGame}>Play Again</NeonButton>
          </div>
        )}
      </div>
      <div className="text-neon-yellow neon-glow mt-4 text-xl font-bold sm:text-2xl">
        SCORE: {players.find((p) => p.id === playerId)?.score || 0}
      </div>
      {!gameWon && (
        <div className="text-neon-yellow neon-glow mt-2 text-center text-xs sm:text-sm">
          USE ARROW KEYS OR WASD TO MOVE
          <br />
          ON MOBILE, TAP THE SCREEN TO CHANGE DIRECTION
        </div>
      )}
    </div>
  );
}
