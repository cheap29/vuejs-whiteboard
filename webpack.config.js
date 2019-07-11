const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: `./src/assets/js/script.js`,
  mode: 'development',
  target: 'web',
  externals: ['./node_modules', "node_helper"],
  plugins: [
    new CopyPlugin([
      { from: 'public', to: '' },
    ]),
  ],
};