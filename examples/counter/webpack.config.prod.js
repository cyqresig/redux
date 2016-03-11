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
    //devtool: 'cheap-module-eval-source-map',
    entry: {

      index: [
        './index'
      ],

    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: 'dist/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),

      function(compiler) {
        this.plugin("done", function(stats) {
          require("fs").writeFileSync(path.join(__dirname, "stats.generated.json"), JSON.stringify(stats.toJson()));
        });
      }

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
        "./page"
      ],

    },
    target: "node",
    output: {
      path: path.join(__dirname, 'dist'),
      //filename: "../../server/page.generated.js",
      filename: "../[name].generated.js",
      publicPath: 'dist/',
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
