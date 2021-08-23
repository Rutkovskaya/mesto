const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',

  devServer:{
    static: {
      directory: path.resolve(__dirname, "static"),
      staticOptions: {},
      publicPath: "/static-public-path/",
      serveIndex: true,
      watch: true,
    },
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
module:{
rules:[
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: '/node_modules/'
  },
  ,
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader']
          },

]
},
  mode: 'development',
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src','index.html')
    })
  ]
};