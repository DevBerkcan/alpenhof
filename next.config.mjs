/** @type {import('next.config').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js Pakete werden transpiliert, damit der App-Router-Build sauber durchläuft
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
