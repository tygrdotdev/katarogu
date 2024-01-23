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
    },
    async headers() {
        return [
            {
                source: "https://db.katarogu.tygr.dev",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://db.katarogu.tygr.dev" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;
