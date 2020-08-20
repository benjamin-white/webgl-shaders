const path        = require('path');
const webpack     = require('webpack');
const liveReload  = require('webpack-livereload-plugin');
const cssExtract  = require('mini-css-extract-plugin');

module.exports = (env, argv) => {

  return {
    entry: './src/index.js',
    mode: argv.mode || 'production',
    watch: argv.mode === 'development',
    watchOptions: {
      ignored: ['node_modules/**']
    },
    stats: {
      colors: true,
      chunks: false,
      modules: false,
      reasons: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.(frag|vert|glsl)$/,
          use: [
            {
              loader: 'glsl-shader-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: cssExtract.loader
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true
                  // localIdentName: '[local]__[hash:base64:20]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => (
                  argv.mode === 'development' ?
                  [] :
                  [
                    require('postcss-preset-env')(),
                    require('cssnano')()
                  ]
                )
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'public/dist/'),
      publicPath: '/public/',
      filename: 'main.js',
      chunkFilename: 'bundle-[name].js', // use [contenthash] for file cache busting
    },
    plugins: [
      new liveReload({
        appendScriptTag: true
      }),
      new cssExtract()
    ]
  }

};
