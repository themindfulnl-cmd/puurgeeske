import type { NextConfig } from "next";

/** One year, in seconds — every asset under these paths is content-addressed
 *  or versioned by deploy, so it is safe to let a phone keep it forever. */
const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Only used by next/image; the homepage ships pre-generated AVIF/WebP so it
  // never pays an optimizer round trip on a cold visit.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  // lucide-react ships ~1500 icon modules; without this every import pulls the
  // barrel file into the client bundle.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    return [
      // Next serves everything in public/ with max-age=0 by default, which is
      // why the posters and films were re-fetched on every single visit.
      { source: "/opt/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: IMMUTABLE }] },
      { source: "/:path*", headers: securityHeaders },
      // The admin surface must never be cached or indexed.
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
