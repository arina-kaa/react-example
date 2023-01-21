module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	rules: {
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
	},
	overrides: [
		{
			files: ['webpack.config.js'],
			rules: {
				'@typescript-eslint/no-var-requires': ['off'],
			},
		},
	],
}
