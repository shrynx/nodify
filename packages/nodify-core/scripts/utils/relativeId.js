'use strict';

const path = require('path');

function isAbsolute(path) {
  const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
  return absolutePath.test(path);
}

function relativeId(id) {
  if (typeof process === 'undefined' || !isAbsolute(id)) {
    return id;
  }
  return path.relative(process.cwd(), id);
}

module.exports = relativeId;
