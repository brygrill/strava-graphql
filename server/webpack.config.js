const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReloadServerPlugin = require('reload-server-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;

// Config used between dev and prod
const common = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'graphql-tag/loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new LodashModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

// Dev specific config
// Only watch and reload server in dev
if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    plugins: [
      new CleanWebpackPlugin(['build'], {
        root: __dirname,
        verbose: true,
      }),
      new ReloadServerPlugin({ script: 'build/bundle.js' }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          PORT: JSON.stringify('3001'),
        },
      }),
    ],
  });
}

// Prod specific config
if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          PORT: JSON.stringify('3001'),
        },
      }),
    ],
  });
}
