const coreJSVersion = require('./node_modules/core-js/package.json').version;

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: {
					version: coreJSVersion,
					proposals: true,
				},
				modules: false,
			},
		],
	],
};
