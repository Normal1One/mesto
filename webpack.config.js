const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    "main.js": [
      path.resolve(__dirname, "src/utils/constants.js"),
      path.resolve(__dirname, "src/pages/index.js"),
      path.resolve(__dirname, "src/components/FormValidator.js"),
      path.resolve(__dirname, "src/components/Card.js"),
      path.resolve(__dirname, "src/components/PopupWithConfirmation.js"),
      path.resolve(__dirname, "src/components/PopupWithForm.js"),
      path.resolve(__dirname, "src/components/PopupWithImage.js"),
      path.resolve(__dirname, "src/components/Popup.js"),
      path.resolve(__dirname, "src/components/Section.js"),
      path.resolve(__dirname, "src/components/UserInfo.js"),
      path.resolve(__dirname, "src/components/Api.js"),
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
