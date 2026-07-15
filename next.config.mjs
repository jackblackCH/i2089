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

  // Disable Turbopack's persistent dev cache. It's the source of the
  // ENOENT '.next/dev/routes-manifest.json' crashes seen in Next 16.2:
  // the on-disk cache falls out of sync with the manifest after any
  // interrupted write and every subsequent request 500s until .next is
  // wiped. Default is `true` (verified in
  // node_modules/next/dist/server/config-shared.js). Turning it off
  // trades ~2–5s of extra cold-start compile for a stable dev server;
  // HMR speed while the server is running is unaffected.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
