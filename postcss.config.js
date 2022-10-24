module.exports = ({ mode }) => {
	return {
		plugins: [
			require('postcss-sort-media-queries')({
				sort: 'desktop-first',
			}),

			mode === 'production'
				? [
						require('postcss-preset-env'),
						require('autoprefixer')({ grid: 'autoplace', cascade: true }),
						require('postcss-merge-longhand'),
				  ]
				: null,
		],
	};
};
