'use strict';

const chalk = require('chalk');
const relativeId = require('./relativeId.js');

if (!process.stderr.isTTY) {
  chalk.enabled = false;
}

// log to stderr to keep `rollup main.js > bundle.js` from breaking
const stderr = console.error.bind(console); // eslint-disable-line no-console

function handleError(err, recover) {
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
    stderr(
      `${relativeId(err.loc.file || err.id)} (${err.loc.line}:${err.loc
        .column})`
    );
  } else if (err.id) {
    stderr(relativeId(err.id));
  }

  if (err.frame) {
    stderr(chalk.dim(err.frame));
  } else if (err.stack) {
    stderr(chalk.dim(err.stack));
  }

  stderr('');

  if (!recover) {
    process.exit(1);
  }
}

module.exports = { stderr, handleError };
