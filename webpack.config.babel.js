import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import Entries from './config/entries';
import envConfig from './config/environment'

const entries = new Entries();

export default {
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|ico|cur|eto|otf)(\?\S*)?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'static/image/[hash].[ext]',
						publicPath: envConfig.publicPath
					}
				}]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin('dist'),
		new MiniCssExtractPlugin({
			filename: 'static/style/[name].css',
			allChunks: true
		}),
		...entries.getHtmlTplPlugins()
	],

	entry: entries.getEntries(),

	output: {
		filename: 'static/js/[name].js',
		path: path.resolve(__dirname, 'dist/')
	},
	resolve: {
		alias: {
			'~static': path.resolve(__dirname, 'src/static')
		}
	},

	mode: 'production'
};
