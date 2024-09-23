const { version } = require("./package.json");
const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		version,
	},
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: [
			"@node-rs/argon2",
			"@dicebear/converter",
		],
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

const millionConfig = {
	auto: true,
};

module.exports = million.next(nextConfig, millionConfig);
