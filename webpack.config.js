'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
	entry: {
    javascript: './js/app.js',
    html: './index.html',
  },
	output: {
		filename: './js/bundle.js',
    path: __dirname + '/dist',
	},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          "react-hot",
          "babel",
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint" },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json', '.jsx'],
  }
};
