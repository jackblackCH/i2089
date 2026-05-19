"use client";

import { useState } from "react";

const Knob = ({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) => {
  const rotation = value * 270 - 135; // Convert 0-1 to -135 to 135 degrees

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    const knob = event.currentTarget;
    const knobRect = knob.getBoundingClientRect();
    const knobCenter = {
      x: knobRect.left + knobRect.width / 2,
      y: knobRect.top + knobRect.height / 2,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const angle = Math.atan2(
        moveEvent.clientY - knobCenter.y,
        moveEvent.clientX - knobCenter.x,
      );
      let newValue = (angle + Math.PI / 2) / Math.PI;
      newValue = Math.max(0, Math.min(1, newValue));
      onChange(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        onMouseDown={handleMouseDown}
        className="cursor-pointer"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            onChange(Math.min(1, value + 0.05));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            onChange(Math.max(0, value - 0.05));
          }
        }}
      >
        <defs>
          <radialGradient
            id="knobGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#4fd1c5" />
            <stop offset="70%" stopColor="#2c7a7b" />
            <stop offset="100%" stopColor="#234e52" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#knobGradient)" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#81e6d9"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d={`M 50 10 A 40 40 0 0 1 ${50 + 40 * Math.cos((rotation * Math.PI) / 180)} ${50 - 40 * Math.sin((rotation * Math.PI) / 180)}`}
          fill="none"
          stroke="#81e6d9"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <circle cx="50" cy="50" r="5" fill="#81e6d9" filter="url(#glow)" />
      </svg>
      <div className="mt-2 text-sm font-semibold text-teal-200">{label}</div>
      <div className="text-xs text-teal-400">{Math.round(value * 100)}%</div>
    </div>
  );
};

export default function DJMixer() {
  const [knobValues, setKnobValues] = useState({
    masterVolume: 0.5,
    deckAVolume: 0.5,
    deckBVolume: 0.5,
    deckABass: 0.5,
    deckBBass: 0.5,
    deckAMid: 0.5,
    deckBMid: 0.5,
    deckATreble: 0.5,
    deckBTreble: 0.5,
    crossfader: 0.5,
    headphoneVolume: 0.5,
    boothVolume: 0.5,
  });

  const handleKnobChange =
    (knob: keyof typeof knobValues) => (value: number) => {
      setKnobValues((prev) => ({ ...prev, [knob]: value }));
    };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <div className="rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-teal-300">
          Futuristic DJ Mixer
        </h1>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <Knob
            value={knobValues.masterVolume}
            onChange={handleKnobChange("masterVolume")}
            label="Master Volume"
          />
          <Knob
            value={knobValues.deckAVolume}
            onChange={handleKnobChange("deckAVolume")}
            label="Deck A Volume"
          />
          <Knob
            value={knobValues.deckBVolume}
            onChange={handleKnobChange("deckBVolume")}
            label="Deck B Volume"
          />
          <Knob
            value={knobValues.deckABass}
            onChange={handleKnobChange("deckABass")}
            label="Deck A Bass"
          />
          <Knob
            value={knobValues.deckBBass}
            onChange={handleKnobChange("deckBBass")}
            label="Deck B Bass"
          />
          <Knob
            value={knobValues.deckAMid}
            onChange={handleKnobChange("deckAMid")}
            label="Deck A Mid"
          />
          <Knob
            value={knobValues.deckBMid}
            onChange={handleKnobChange("deckBMid")}
            label="Deck B Mid"
          />
          <Knob
            value={knobValues.deckATreble}
            onChange={handleKnobChange("deckATreble")}
            label="Deck A Treble"
          />
          <Knob
            value={knobValues.deckBTreble}
            onChange={handleKnobChange("deckBTreble")}
            label="Deck B Treble"
          />
          <Knob
            value={knobValues.crossfader}
            onChange={handleKnobChange("crossfader")}
            label="Crossfader"
          />
          <Knob
            value={knobValues.headphoneVolume}
            onChange={handleKnobChange("headphoneVolume")}
            label="Headphone Volume"
          />
          <Knob
            value={knobValues.boothVolume}
            onChange={handleKnobChange("boothVolume")}
            label="Booth Volume"
          />
        </div>
      </div>
    </div>
  );
}
