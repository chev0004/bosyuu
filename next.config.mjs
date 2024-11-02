/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=60, stale-while-revalidate=300',
					},
				],
			},
		];
	},
};

export default nextConfig;
