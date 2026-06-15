/** @type {import('next').NextConfig} */

// For a GitHub Pages *project* site the app is served from
// https://<user>.github.io/<repo>/  -> basePath must be "/<repo>".
// The CI workflow sets BASE_PATH=/gender-reveal. Locally it stays "".
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  // Static HTML export -> ./out, deployable to any static host (GitHub Pages).
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Emit /slug/index.html so GitHub Pages serves clean folder URLs.
  trailingSlash: true,
  // next/image optimization needs a server; disable for static export.
  images: { unoptimized: true },
  // Expose basePath to the browser for building asset/links if needed.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
