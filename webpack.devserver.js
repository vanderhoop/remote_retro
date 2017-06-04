#!/usr/bin/env node
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const config = require("./webpack.config")
const { port } = config.devServer

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  compress: true,
  headers: { "Access-Control-Allow-Origin": "*" },
}).listen(port, "0.0.0.0", (err, result) => {
  if (err) console.error(err)
  console.log(`[info] Running webpack-dev-server using http://localhost:${port}\n`)
})

// Exit on end of STDIN
process.stdin.resume()
process.stdin.on("end", () => {
  process.exit(0)
})
