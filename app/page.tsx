export default function Home() {
  return (
    <main className="">
      <h1 className="sr-only text-3xl">
        i2089 - Marc Illien - High quality frontend development, made in Zurich
      </h1>
      <CombinedPage />
    </main>
  );
}

function CombinedPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="relative w-full flex-grow overflow-hidden bg-[#f1f1f1]">
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
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#keyLight)"
            />
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#fillLight)"
            />
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#backLight)"
            />
          </svg>
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute left-0 top-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-30"></div>
          <div className="absolute right-0 top-0 h-1/2 w-1/2 bg-gradient-radial from-gray-200 to-transparent opacity-20"></div>
        </div>

        <div className="relative z-20 flex min-h-screen flex-col justify-between px-8 py-8 md:px-16 md:py-16 lg:py-24">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col justify-between">
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl lg:text-3xl">
                I am
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl lg:text-6xl">
                Marc Illien, a Fullstack and Frontend Developer from Zurich.{" "}
                <a
                  href="mailto:hi@i2089.com"
                  className="text-[#0F05A0] transition-colors duration-200 hover:text-[#0C0480]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </a>
                .
              </h2>
            </div>
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl lg:text-3xl">
                I love
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl lg:text-6xl">
                Excellent user experience and Design.
              </h2>
            </div>
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl lg:text-3xl">
                I create
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl lg:text-6xl">
                High-quality, modern web and mobile applications.
              </h2>
            </div>
            <div className="md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl lg:text-3xl">
                I also do
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl lg:text-6xl">
                Frontend Consulting, Prototypes &amp; MVP&apos;s, Motion Design
                3D, Design Systems, Living Styleguides, Micro Frontend
                Applications, Code- and tech stack reviews.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
