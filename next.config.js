/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: ''
			},
		],
	},
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true }
		return config
	},
}

module.exports = nextConfig
