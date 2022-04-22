import * as webpack from 'webpack';
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  // do your config modifications here
  if (config.plugins) {
    config.plugins.push(
      // new ManifestPlugin({
      //   fileName: 'list.json',
      // }),
      new CompressionPlugin()
    );
  }
  if (config.optimization) {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: {
          banner: (licenseFile: any) => {
            return `${new Date().toLocaleString()}`;
          },
        },
        terserOptions: {
          sourceMap: false,
          compress: {
            drop_console: true,
          },
        },
      }),
    ];
  }

  return config;
};
