/* eslint-disable no-param-reassign */
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

require('dotenv').config();

const nextConfig = {
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    config.module.rules.push({
      enforce: 'pre',
      test: /\.scss$/,
      loader: 'sass-resources-loader',
      options: {
        resources: ['./src/styles/vars.scss', './src/styles/mixins.scss'],
      },
    });

    if (!dev) {
      config.plugins.push(new OptimizeCSSAssetsPlugin({}));
    }

    return config;
  },
};

module.exports = withPlugins(
  [withCSS, withFonts, withSass, withImages],
  nextConfig,
);
