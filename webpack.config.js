const path = require('path')
const eslintFormatter = require('eslint-formatter-friendly')
const ESLintPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const stylelintFormatter = require('stylelint-formatter-pretty')
const StylelintPlugin = require('stylelint-webpack-plugin')
const { merge } = require('webpack-merge')

const project = {
	entry: './src/index.tsx',
	outputFolder: 'build',
	template: './src/index.html',
}

const commonConfig = {
	entry: project.entry,
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, project.outputFolder),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|svg)$/i,
				use: 'url-loader',
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5]',
								exportLocalsConvention: 'camelCase',
							},
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: project.template,
			filename: 'index.html',
		}),
		new ESLintPlugin({
			formatter: eslintFormatter,
		}),
		new StylelintPlugin({
			formatter: stylelintFormatter,
		}),
	],
}

const productionConfig = {
	mode: 'production',
}

const developmentConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 9000,
		compress: true,
		open: true,
		hot: true,
		client: {
			overlay: true,
		},
	},
}

module.exports = (env, args) => {
	switch (args.mode) {
		case 'production':
			return merge(commonConfig, productionConfig)
		case 'development':
			return merge(commonConfig, developmentConfig)
		default:
			throw new Error('No matching configuration was found!')
	}
}
