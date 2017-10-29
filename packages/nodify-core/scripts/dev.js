'use strict';

const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const chalk = require('chalk');
const ms = require('pretty-ms');
const onExit = require('signal-exit');
const dateTime = require('date-time');
const createConfig = require('./utils/createConfig.js');
const batchWarnings = require('./utils/batchWarnings.js');
const alternateScreen = require('./utils/alternateScreen.js');
const relativeId = require('./utils/relativeId.js');
const { handleError, stderr } = require('./utils/logging.js');
const startServer = require('./utils/startServer');
const paths = require('../config/paths');
const baseConfig = require('../config/rollup.config');

const isTTY = Boolean(process.stderr.isTTY);

const screen = alternateScreen(isTTY);
screen.open();

const warnings = batchWarnings();

let watcher;

function start() {
  let customConfig = {};

  if (fs.existsSync(paths.customConfigPath)) {
    const customConfigModule = require(paths.customConfigPath);
    customConfig = customConfigModule.default || customConfigModule;
  }

  const coreConfig = customConfig.rollup
    ? createConfig(customConfig.rollup(baseConfig))
    : createConfig(baseConfig);

  const rollupConfig = Object.assign({}, coreConfig.inputOptions, {
    output: coreConfig.outputOptions,
  });

  watcher = rollup.watch(rollupConfig);

  watcher.on('event', event => {
    switch (event.code) {
      case 'FATAL':
        screen.close();
        handleError(event.error, true);
        process.exit(1);
        break;

      case 'ERROR':
        warnings.flush();
        handleError(event.error, true);
        break;

      case 'START':
        screen.reset(chalk.underline(`rollup v${rollup.VERSION}`));
        break;

      case 'BUNDLE_START':
        stderr(
          chalk.cyan(
            `bundles ${chalk.bold(event.input)} → ${chalk.bold(
              event.output.map(relativeId).join(', ')
            )}...`
          )
        );

        break;

      case 'BUNDLE_END':
        warnings.flush();
        // screen.reset();
        stderr(
          chalk.green(
            `created ${chalk.bold(
              event.output.map(relativeId).join(', ')
            )} in ${chalk.bold(ms(event.duration))}`
          )
        );
        startServer(rollupConfig.output[0].file);

        break;

      case 'END':
        if (isTTY) {
          stderr(`\n[${dateTime()}] waiting for changes...`);
        }
        break;
    }
  });
}

// catch ctrl+c, kill, and uncaught errors
const removeOnExit = onExit(close);
process.on('uncaughtException', close);

// only listen to stdin if it is a pipe
if (!process.stdin.isTTY) {
  process.stdin.on('end', close); // in case we ever support stdin!
}

function close() {
  removeOnExit();
  process.removeListener('uncaughtException', close);
  // removing a non-existent listener is a no-op
  process.stdin.removeListener('end', close);

  screen.close();
  watcher.close();
}

start();
