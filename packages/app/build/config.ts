import type Config from 'webpack-chain'

export const env = process.env.NODE_ENV as 'development' | 'production'

export const base = `/${process.env.BASE}/`

export const proxy = {
	'/api': {
		target: 'http://local.iqka.com:5099',
		changeOrigin: true
	},
	'/extend': {
		target: 'http://local.iqka.com:5099',
		changeOrigin: true
      },
      '/assets': {
		target: 'http://local.iqka.com:5099',
		changeOrigin: true
      },
      '/iframe': {
		target: 'http://local.iqka.com:5099',
		changeOrigin: true
	}
}

export const conventionRoutes = {
	exclude: [
		/model\.(j|t)sx?$/,
		/services\.(j|t)sx?$/,
		/types\.(j|t)sx?$/,
		/hooks\.(j|t)sx?$/,
		/locales\.(j|t)sx?$/,
		/components\//,
		/hooks\//,
		/locales\//
	]
}

export const links = [
	{ rel: 'stylesheet', href: `/${process.env.BASE}/icon_font.css` },
	{ rel: 'stylesheet', href: `/${process.env.BASE}/theme/light.css` }
]

export const chainWebpack = (config: Config) => {
	if (env === 'production') {
		config.merge({
			optimization: {
				splitChunks: {
					chunks: 'all',
					minSize: 30000,
					minChunks: 3,
					automaticNameDelimiter: '.',
					cacheGroups: {
						vendor: {
							name: 'vendors',
							test({ resource }: any) {
								return /[\\/]node_modules[\\/]/.test(resource)
							},
							priority: 10
						}
					}
				}
			}
		})
	}
}

export const extraBabelPlugins = ['babel-plugin-transform-typescript-metadata']
