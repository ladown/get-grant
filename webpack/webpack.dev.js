const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');
const HookPlugin = require('./hook-plugin');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'eval-cheap-source-map',

	devServer: {
		open: '/page-list.html',
		hot: true,
		liveReload: true,
		compress: true,
		historyApiFallback: true,
		static: {
			directory: paths.build.default,
		},
		watchFiles: {
			paths: ['src/**/*.*'],
			options: {
				usePolling: true,
			},
		},
	},

	plugins: [new HookPlugin('RunSvgSpriteGenerator', 'node ./webpack/svgSprite.js', 'emit')],
});
