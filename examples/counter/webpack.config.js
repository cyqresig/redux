var path = require('path')
var webpack = require('webpack')

var commonLoaders = [
  //{ test: /\.js$/, loader: "jsx-loader" },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
]

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    devtool: 'cheap-module-eval-source-map',
    entry: {

       index: [
          'webpack-hot-middleware/client',
          './index'
       ],

    },

    output: {
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js',
      publicPath: 'static/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: commonLoaders.concat([
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname,
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
      ]),
      postLoaders: [
        {
          test: /\.js$/,
          loaders: ['es3ify-loader']
        }
      ]

    }
  },

  {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    //entry: "./server/page.js",
    entry: {

      page: [
        'webpack-hot-middleware/client',
        "./page"
      ],

    },
    target: "node",
    output: {
      path: path.join(__dirname, 'static'),
      //filename: "../../server/page.generated.js",
      filename: "../[name].generated.js",
      publicPath: 'static/',
      libraryTarget: "commonjs2"
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: commonLoaders.concat([
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname,
        },
        { test: /\.css$/,  loader: path.join(__dirname, "style-collector") + "!css-loader" },
      ])
    }
  }
]
