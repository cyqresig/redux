//var webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
//var webpackHotMiddleware = require('webpack-hot-middleware')
//var config = require('./webpack.config')

var path = require('path')
var express = require('express')
var app = new express()
var port = 3000

var stats = require("./stats.generated.json")
var page = require("./page.generated.js");

////use in webpack development mode
//var compiler = webpack(config)
//app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config[0].output.publicPath }))
//app.use(webpackHotMiddleware(compiler))

//use in webpack production mode
app.use(express.static(__dirname));

//app.get("/", function(req, res) {
//  res.sendFile(__dirname + '/index.html')
//})

app.get("/", function(req, res) {
  console.log('stats.assetsByChunkName.index = ' + stats.assetsByChunkName.index);
  res.end(page(req, stats.assetsByChunkName.index));
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
