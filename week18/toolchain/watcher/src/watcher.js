const chokidar = require('chokidar');
const { exec } = require("child_process");

exec("http-server");
// One-liner for current directory
chokidar.watch('.\\week18\\toolchain\\watcher\\src\\').on('all', (event, path) => {
  console.log(event, path);
  console.log('webpack')
  exec("webpack");
});