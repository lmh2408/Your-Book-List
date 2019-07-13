


var config = {
  mode: 'development',
  entry: __dirname + '/app/Index.jsx',
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dirname + '/public/javascripts',
    publicPath: '/javascripts/'
  }
};

config.module = {
  rules: [
    {
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ["syntax-dynamic-import", '@babel/plugin-proposal-class-properties']
        }
      }
    }
  ]
}

config.mode = process.env.NODE_ENV || 'development';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      exclude: /node_modules/,
    })
  ],
};

module.exports = config;
