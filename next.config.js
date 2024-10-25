const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		version,
	},
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
	},
	images: {
		remotePatterns: [
			{
				hostname: "localhost",
			},
			{
				hostname: "images.unsplash.com",
			},
		],
	},
};

module.exports = nextConfig;
