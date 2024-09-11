/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.ezifarmer.com",
      },
    ],
  },
};

export default nextConfig;
