const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    "main.js": [
      path.resolve(__dirname, "src/scripts/Card.js"),
      path.resolve(__dirname, "src/scripts/cards.js"),
      path.resolve(__dirname, "src/scripts/FormValidator.js"),
      path.resolve(__dirname, "src/scripts/index.js"),
      path.resolve(__dirname, "src/scripts/PopupWithForm.js"),
      path.resolve(__dirname, "src/scripts/PopupWithImage.js"),
      path.resolve(__dirname, "src/scripts/Popup.js"),
      path.resolve(__dirname, "src/scripts/Section.js"),
      path.resolve(__dirname, "src/scripts/UserInfo.js"),
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
      publicPath: ""
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            importLoaders: 1,
          }
        },
        'postcss-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};