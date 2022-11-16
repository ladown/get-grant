const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const paths = require('./paths');
const { generateWebpackEntries, setPageList } = require('./utils');

module.exports = {
	target: 'web',

	entry: generateWebpackEntries(),

	output: {
		path: paths.build.default,
		publicPath: 'auto',
		filename: 'js/[name].[contenthash:8].js',
		chunkFilename: 'js/[name].[id].js',
		clean: true,
	},

	resolve: {
		alias: {
			Icons: path.resolve(__dirname, '../src/icons/'),
			Images: path.resolve(__dirname, '../src/img/'),
			Fonts: path.resolve(__dirname, '../src/fonts/'),
			Styles: path.resolve(__dirname, '../src/scss/'),
			Scripts: path.resolve(__dirname, '../src/js/'),
			Static: path.resolve(__dirname, '../src/static/'),
		},
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: paths.src.sprite,
					to: paths.build.sprite,
					noErrorOnMissing: true,
				},
				{
					from: paths.src.static,
					to: paths.build.static,
					noErrorOnMissing: true,
				},
			],
		}),

		new PugPlugin({
			extractCss: {
				filename: 'css/[name].[contenthash:8].css',
			},
			postprocess(content, { assetFile }) {
				if (assetFile.includes('page-list')) {
					const newContent = setPageList(content);

					return newContent;
				} else {
					const newContent = content.replaceAll(
						/(?:^|[^а-яёА-ЯЁ0-9_])(в|без|а|до|из|к|я|на|по|о|от|перед|при|через|с|у|за|над|об|под|про|для|и|или|со|около|между)(?:^|[^а-яёА-ЯЁ0-9_])/g,
						(match) => {
							return match.slice(-1) === ' ' ? `${match.substr(0, match.length - 1)}&nbsp;` : match;
						},
					);
					return newContent;
				}
			},
		}),
	],

	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
			},

			{
				test: /\.m?js$/,
				exclude: [/node_modules/, /bower_components/],
				use: {
					loader: 'babel-loader',
				},
			},

			{
				test: /\.(c|sa|sc)ss$/i,
				use: ['css-loader', 'postcss-loader', 'sass-loader', 'glob-import-loader'],
			},

			{
				test: /\.(woff2?|ttf|otf|eot|svg)$/,
				include: /[\\/]fonts/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]',
				},
			},

			{
				test: /\.(png|svg|jpe?g|webp|gif|icon)$/i,
				exclude: [/[\\/]icons/, /(sprite\.svg)/],
				include: /[\\/]img/,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name].[hash:8][ext]',
				},
			},
		],
	},
};
