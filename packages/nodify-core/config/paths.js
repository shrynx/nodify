'use strict';

const path = require('path');

const rootPath = path.resolve(process.cwd());
const srcPath = path.join(rootPath, 'src', 'index.js');
const buildPath = path.join(rootPath, 'build', 'main.js');
const customConfigPath = path.join(rootPath, 'nodify.config.js');

module.exports = {
  srcPath,
  buildPath,
  customConfigPath,
};
