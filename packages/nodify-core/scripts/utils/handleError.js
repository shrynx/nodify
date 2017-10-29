'use strict';

const rimraf = require('rimraf');
const chalk = require('chalk');

const stderr = console.error.bind(console);

function handleError(err) {
  let description = err.message || err;
  if (err.name) {
    description = `${err.name}: ${description}`;
  }
  const message =
    (err.plugin ? `(${err.plugin} plugin) ${description}` : description) || err;

  stderr(chalk.bold.red(`[!] ${chalk.bold(message)}`));

  // TODO should this be "err.url || (err.file && err.loc.file) || err.id"?
  if (err.url) {
    stderr(chalk.cyan(err.url));
  }

  if (err.loc) {
    stderr(`${err.loc.file || err.id} (${err.loc.line}:${err.loc.column})`);
  } else if (err.id) {
    stderr(relativeId(err.id));
  }

  if (err.frame) {
    stderr(chalk.dim(err.frame));
  } else if (err.stack) {
    stderr(chalk.dim(err.stack));
  }

  stderr('');
  process.exit(1);
  if (!recover) {
    process.exit(1);
  }
}

module.exports = handleError;
