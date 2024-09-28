export default function Logo2089() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient
              id="keyLight"
              cx="75%"
              cy="25%"
              r="50%"
              fx="75%"
              fy="25%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="fillLight"
              cx="25%"
              cy="25%"
              r="50%"
              fx="25%"
              fy="25%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="backLight"
              cx="50%"
              cy="100%"
              r="50%"
              fx="50%"
              fy="100%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="magicalRainbowGradient"
              x1="0%"
              y1="20%"
              x2="100%"
              y2="80%"
            >
              <stop offset="0%" stopColor="rgba(255, 0, 255, 0.9)" />{" "}
              {/* Magenta */}
              <stop offset="16.67%" stopColor="rgba(138, 43, 226, 0.9)" />{" "}
              {/* Blue Violet */}
              <stop offset="33.33%" stopColor="rgba(0, 191, 255, 0.9)" />{" "}
              {/* Deep Sky Blue */}
              <stop offset="50%" stopColor="rgba(0, 255, 127, 0.9)" />{" "}
              {/* Spring Green */}
              <stop offset="66.67%" stopColor="rgba(255, 215, 0, 0.9)" />{" "}
              {/* Gold */}
              <stop offset="83.33%" stopColor="rgba(255, 69, 0, 0.9)" />{" "}
              {/* Orange Red */}
              <stop offset="100%" stopColor="rgba(255, 20, 147, 0.9)" />{" "}
              {/* Deep Pink */}
            </linearGradient>
            <filter id="softShadow">
              <feDropShadow
                dx="0.22"
                dy="0.22"
                stdDeviation="9"
                floodOpacity="0.8"
              />
            </filter>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#keyLight)" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#fillLight)" />
          <rect x="0" y="0" width="100%" height="100%" fill="url(#backLight)" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10">
        <div className="absolute left-0 top-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-30"></div>
        <div className="absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-30"></div>
      </div>

      <div className="absolute inset-0 z-20 flex select-none items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path id="textPath" d="M0,100 h400" />
            </defs>
            <text
              className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl"
              style={{
                fill: "transparent",
                stroke: "url(#magicalRainbowGradient)",
                strokeWidth: "0.5px",
                filter: "url(#softShadow)",
              }}
            >
              <textPath
                xlinkHref="#textPath"
                startOffset="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                i2089
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
