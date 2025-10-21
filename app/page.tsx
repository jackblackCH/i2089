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
      <div className="relative w-full flex-grow overflow-hidden text-balance">
        <div className="relative z-20 flex min-h-screen flex-col justify-between px-8 py-8 md:px-16 md:py-16 lg:py-24">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col justify-between">
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl">
                I am
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl">
                Marc Illien, a Fullstack and Frontend Developer from Zurich.{" "}
                <a
                  href="mailto:hi@i2089.com"
                  className="underline transition-colors duration-200 hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </a>
                .
              </h2>
            </div>
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl">
                I love
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl">
                Excellent user experience and Design.
              </h2>
            </div>
            <div className="mb-8 md:mb-12 md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl">
                I create
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl">
                High-quality, modern web and mobile applications.
              </h2>
            </div>
            <div className="md:flex md:items-start md:space-x-8 lg:space-x-16">
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-[#222] sm:text-xl md:mb-0 md:w-[38.196601125010515%] md:text-2xl">
                I also do
              </h3>
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-gray-700 [text-shadow:0_0_80px_rgba(0,0,0,0.22)] sm:text-4xl md:w-[61.80339887498948%] md:text-5xl">
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
