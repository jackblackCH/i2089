"use client";

import React, { useEffect, useRef, useState } from "react";

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;

type Position = { x: number; y: number };

function RetroNeonLogo() {
  return (
    <div className="mb-8 w-full text-center">
      <h1 className="text-5xl font-extrabold leading-none tracking-tighter">
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
    <svg width="200" height="200" viewBox="0 0 200 200" className="mb-8">
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

export default function RetroNeonElectricCheeseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [panther, setPanther] = useState<Position>({ x: 10, y: 7 });
  const [cheeses, setCheeses] = useState<Position[]>([]);
  const [direction, setDirection] = useState<string>("right");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initialCheeses: Position[] = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        if (Math.random() < 0.1) {
          initialCheeses.push({ x, y });
        }
      }
    }
    setCheeses(initialCheeses);

    draw(ctx);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          setDirection("up");
          break;
        case "arrowdown":
        case "s":
          setDirection("down");
          break;
        case "arrowleft":
        case "a":
          setDirection("left");
          break;
        case "arrowright":
        case "d":
          setDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      movePanther();
    }, 200);

    return () => clearInterval(gameLoop);
  }, [panther, direction, cheeses]);

  const movePanther = () => {
    let newX = panther.x;
    let newY = panther.y;

    switch (direction) {
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

    setPanther({ x: newX, y: newY });

    const cheeseIndex = cheeses.findIndex(
      (cheese) => cheese.x === newX && cheese.y === newY,
    );
    if (cheeseIndex !== -1) {
      setCheeses(cheeses.filter((_, index) => index !== cheeseIndex));
      setScore((prevScore) => prevScore + 10);
    }

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

    drawNeonPanther(
      ctx,
      panther.x * CELL_SIZE,
      panther.y * CELL_SIZE,
      direction,
    );
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

  const drawNeonPanther = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: string,
  ) => {
    ctx.fillStyle = "#FF00FF";
    ctx.shadowColor = "#FF00FF";
    ctx.shadowBlur = 10;
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#FFFFFF";
    switch (direction) {
      case "up":
        ctx.fillRect(x + 4, y + 2, 4, 4);
        ctx.fillRect(x + CELL_SIZE - 8, y + 2, 4, 4);
        break;
      case "down":
        ctx.fillRect(x + 4, y + CELL_SIZE - 6, 4, 4);
        ctx.fillRect(x + CELL_SIZE - 8, y + CELL_SIZE - 6, 4, 4);
        break;
      case "left":
        ctx.fillRect(x + 2, y + 4, 4, 4);
        ctx.fillRect(x + 2, y + CELL_SIZE - 8, 4, 4);
        break;
      case "right":
        ctx.fillRect(x + CELL_SIZE - 6, y + 4, 4, 4);
        ctx.fillRect(x + CELL_SIZE - 6, y + CELL_SIZE - 8, 4, 4);
        break;
    }
    ctx.shadowBlur = 0;
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
      <canvas
        ref={canvasRef}
        width={GRID_WIDTH * CELL_SIZE}
        height={GRID_HEIGHT * CELL_SIZE}
        className="border-neon-yellow neon-glow rounded-lg border-4 shadow-lg"
      />
      <div className="text-neon-yellow neon-glow mt-4 text-2xl font-bold">
        SCORE: {score}
      </div>
      <div className="text-neon-yellow neon-glow mt-2 text-sm">
        USE ARROW KEYS OR WASD TO MOVE
      </div>
    </div>
  );
}
