// copied webpack.config.js to configure server bundle rendering

const path = require('path')
const webpack = require('webpack')

const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
    // setting a target to node to avoid built-in packages
  target: 'node',  
   // use new js server
  entry: './src/main.server.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
   // create node compatible instead of browser
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
   // other vue-loader options
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
   // removed devServer
  performance: {
    hints: false
  },
   // externals added to avoid external dependencies and uses node_modules directly from package
  externals: Object.keys(require('./package.json').dependencies),
  devtool: 'source-map',
   //removed dot env if statement and added ssr plugin
    plugins: [
        new VueSSRPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
