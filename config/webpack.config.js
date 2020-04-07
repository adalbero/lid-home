const autoprefixer = require('autoprefixer');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    context: path.resolve(__dirname, '../src'),
    entry: ['./app.scss', './app.js'],
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        {
          from: '../src/*.html',
          to: '../public/',
        },
      ]),
    ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, '../public/'),
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      overlay: true,
      watchContentBase: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'main.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // Prefer Dart Sass
                implementation: require('sass'),
                sassOptions: {
                  includePaths: ['./node_modules'],
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
  },
];
