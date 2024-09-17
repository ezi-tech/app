import { withTypedHandlers } from "typed-handlers/next";

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

export default withTypedHandlers(nextConfig);
