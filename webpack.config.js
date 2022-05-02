const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
require('@babel/polyfill');

module.exports = (env, opts) => {
	const config = {
		resolve: {
			extensions: ['.js', '.vue'],
			fallback: {
				fs: false,
				path: require.resolve('path-browserify'),
			},
		},
		entry: {
			app: ['@babel/polyfill', path.join(__dirname, 'main.js')],
		},
		output: {
			filename: '[name].js', // app.js
			path: path.join(__dirname, 'dist'),
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: 'vue-loader',
				},
				{
					test: /\.css$/,
					use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
				},
				{
					test: /\.scss$/,
					use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'index.html'),
			}),
			new VueLoaderPlugin(),
			new CopyPlugin({
				patterns: [{ from: 'assets/', to: '' }],
			}),
		],
	};

	if (opts.mode === 'development') {
		return merge(config, {
			devtool: 'eval',
			devServer: {
				historyApiFallback: true,
				port: 8080,
				open: true,
				hot: true, //HMR: Hot Module Replacement
			},
		});
	} else {
		return merge(config, {
			devtool: 'cheap-module-map',
			plugins: [new CleanWebpackPlugin()],
		});
	}
};
