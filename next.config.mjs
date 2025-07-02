/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // ESTA LISTA DEVE ESTAR VAZIA ou conter APENAS redirects que você realmente quer.
      // SE HOUVER UM REDIRECT DE '/' PARA '/seguros' AQUI, REMOVA-O.
    ];
  },
};

export default nextConfig;