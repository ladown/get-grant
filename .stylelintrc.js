module.exports = {
	extends: ['stylelint-config-prettier-scss', 'stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	plugins: ['stylelint-prettier', 'stylelint-order'],
	rules: {
		'prettier/prettier': true,
		indentation: 'tab',
		'string-quotes': 'single',
		'selector-attribute-quotes': 'always',
		'selector-attribute-operator-space-before': 'always',
		'selector-attribute-operator-space-after': 'always',
		'declaration-block-trailing-semicolon': 'always',
		'declaration-colon-space-before': 'never',
		'declaration-colon-space-after': 'always',
		'function-url-quotes': 'always',
		'media-feature-parentheses-space-inside': 'never',
		'media-feature-colon-space-before': 'never',
		'media-feature-colon-space-after': 'always',
		'block-opening-brace-space-before': 'always',
		'selector-attribute-operator-space-after': 'never',
		'selector-attribute-operator-space-before': 'never',
		'selector-class-pattern': null,
	},
};
