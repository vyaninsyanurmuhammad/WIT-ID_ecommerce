/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "api.escuelajs.co",
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
