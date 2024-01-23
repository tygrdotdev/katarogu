/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "127.0.0.1" },
            { hostname: "localhost" },
            { hostname: "api.dicebear.com" },
            { hostname: "images.unsplash.com" },
            { hostname: "db.katarogu.tygr.dev" }
        ]
    }
};

export default nextConfig;
