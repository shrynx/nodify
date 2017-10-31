'use strict';

const chalk = require('chalk');
const relativeId = require('./relativeId');
const stderr = require('./stderr.js');

const replaceRelativePath = str => {
  const cwd = process.cwd();
  const re = new RegExp(cwd, 'g');
  return str.replace(re, '.');
};

function handleError(err) {
  let description = err.message || err;
  if (err.name) {
    description = `${err.name}: ${description}`;
  }
  const message =
    (err.plugin ? `(${err.plugin} plugin) \n${description}` : description) ||
    err;
  stderr(chalk.bold.red(`[!] ${chalk.bold(replaceRelativePath(message))}`));

  if (err.url) {
    stderr(chalk.cyan(replaceRelativePath(err.url)));
  }

  if (err.loc) {
    stderr(
      replaceRelativePath(
        `${err.loc.file || err.id} (${err.loc.line}:${err.loc.column})`
      )
    );
  } else if (err.id) {
    stderr(relativeId(err.id));
  }

  if (err.codeFrame) {
    stderr('\n');
    stderr(err.codeFrame);
    stderr('\n');
  }

  if (err.frame) {
    stderr(chalk.gray(replaceRelativePath(err.frame)));
  } else if (err.stack) {
    stderr(chalk.gray(replaceRelativePath(err.stack)));
  }
}

module.exports = handleError;
