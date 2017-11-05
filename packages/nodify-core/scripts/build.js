'use strict';

const rollup = require('rollup');
const fs = require('fs');
const chalk = require('chalk');
const ms = require('pretty-ms');
const paths = require('../config/paths');
const handleError = require('./utils/handleError');
const stderr = require('./utils/stderr');
const createConfig = require('./utils/createConfig');
const relativeId = require('./utils/relativeId');
const clearConsole = require('./utils/clearConsole');
const baseConfig = require('../config/rollup.config');

function build() {
  clearConsole();
  let customConfig = {};

  if (fs.existsSync(paths.customConfigPath)) {
    const customConfigModule = require(paths.customConfigPath);
    customConfig = customConfigModule.default || customConfigModule;
  }

  const coreConfig = customConfig.rollup
    ? customConfig.rollup(baseConfig)
    : baseConfig;

  const rollupConfig = createConfig(coreConfig);

  const inputOptions = rollupConfig.inputOptions;
  const outputOptions = rollupConfig.outputOptions;

  const start = Date.now();
  const files = outputOptions.map(t => relativeId(t.file));

  stderr(chalk.cyan(`Creating bundle ...\n`));

  return rollup
    .rollup(inputOptions)
    .then(bundle => {
      const output = outputOptions[0];
      return bundle.write(output);
    })
    .then(() => {
      stderr(
        chalk.green(
          `created ${chalk.bold(files.join(', '))} in ${chalk.bold(
            ms(Date.now() - start)
          )}`
        )
      );
    })
    .catch(handleError);
}

build();
