'use strict';

const chalk = require('chalk');
const relativeId = require('./relativeId');
const stderr = require('./stderr.js');

function handleError(err) {
  let description = err.message || err;
  if (err.name) {
    description = `${err.name}: ${description}`;
  }
  const message =
    (err.plugin ? `(${err.plugin} plugin) \n${description}` : description) || err;
  stderr(chalk.bold.red(`[!] ${chalk.bold(message)}`));

  if (err.url) {
    stderr(chalk.cyan(err.url));
  }

  if (err.loc) {
    stderr(`${err.loc.file || err.id} (${err.loc.line}:${err.loc.column})`);
  } else if (err.id) {
    stderr(relativeId(err.id));
  }

  if (err.codeFrame) {
    stderr('\n');
    stderr(err.codeFrame);
    stderr('\n');
  }

  if (err.frame) {
    stderr(chalk.gray(err.frame));
  } else if (err.stack) {
    stderr(chalk.gray(err.stack));
  }
}

module.exports = handleError;
