const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		version,
	},
};

module.exports = nextConfig;
