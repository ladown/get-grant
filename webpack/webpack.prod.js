const { merge } = require('webpack-merge');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const HookPlugin = require('./hook-plugin');
const commonOptions = require('./webpack.common');

module.exports = merge(commonOptions, {
	mode: 'production',

	devtool: false,

	plugins: [new HookPlugin('RunSvgSpriteGenerator', 'node ./webpack/svgSprite.js', 'beforeRun')],

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/].+\.(js|ts)$/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},

		minimizer: [
			'...',
			new ImageMinimizerPlugin({
				test: /.(jpe?g|png|gif|svg)$/i,
				exclude: /(sprite\.svg|favicons)/,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true, quality: 'hight' }],
							['optipng', { optimizationLevel: 5, quality: [0.7, 1] }],
							'imagemin-svgo',
						],
					},
				},
			}),
			'...',
		],
	},
});
