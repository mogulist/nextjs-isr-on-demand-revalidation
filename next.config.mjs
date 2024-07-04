/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "lorempixel.com",
      "placeimg.com",
      "picsum.photos",
      "via.placeholder.com",
      "cdn.fakercloud.com",
      "loremflickr.com",
    ],
  },
};

export default nextConfig;
