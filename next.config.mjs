/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set BUILD_STATIC=1 to produce a static export in ./out (npm run build).
  ...(process.env.BUILD_STATIC
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {
        async rewrites() {
          return [
            {
              source: "/ingest/static/:path*",
              destination: "https://eu-assets.i.posthog.com/static/:path*",
            },
            {
              source: "/ingest/:path*",
              destination: "https://eu.i.posthog.com/:path*",
            },
          ];
        },
      }),
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
