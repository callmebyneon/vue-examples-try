const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: {
		app: path.join(__dirname, "main.js"),
	},
	output: {
		filename: "[name].js", // app.js
		path: path.join(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		// +
	],
};
