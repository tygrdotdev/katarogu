const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		version,
	},
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
	},
	webpack: (config) => {
		// this will override the experiments
		config.experiments = { ...config.experiments, topLevelAwait: true };
		// this will just update topLevelAwait property of config.experiments
		// config.experiments.topLevelAwait = true
		return config;
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
