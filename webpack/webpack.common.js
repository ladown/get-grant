const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const paths = require('./paths');
const { generateWebpackEntries, generateTemplaet } = require('./utils');

fs.writeFileSync(`${paths.src.pugPages}/index.pug`, generateTemplaet(), { encoding: 'utf8' });

module.exports = {
	target: 'web',

	entry: generateWebpackEntries(),

	output: {
		path: paths.build.default,
		publicPath: '/',
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
				{
					from: paths.src.favicon,
					to: paths.build.favicon,
					noErrorOnMissing: true,
				},
			],
		}),

		new PugPlugin({
			extractCss: {
				filename: 'css/[name].[contenthash:8].css',
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
				exclude: /(node_modules|bower_components)/,
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
				include: /fonts/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},

			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				exclude: [/sprite/, /favicon/],
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]',
				},
			},
		],
	},
};
