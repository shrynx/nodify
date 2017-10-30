'use strict';

const nodemon = require('nodemon');
const once = require('ramda').once;

const startServer = once(file => {
  nodemon({
    script: file,
    watch: file,
    nodeArgs: process.argv.slice(3),
  }).on('quit', process.exit);
});

process.on('SIGINT', process.exit);

module.exports = startServer;
