'use strict';

const rollup = require('rollup');
const fs = require('fs');
const paths = require('../config/paths');
const baseConfig = require('../config/rollup.config');
const handleError = require('./utils/handleError');
const createConfig = require('./utils/createConfig');

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
const outputOptions = rollupConfig.outputOptions[0];

console.log('preparing bundle');
rollup
  .rollup(inputOptions)
  .then(bundle => {
    bundle.write(outputOptions);
    console.log('build ready');
  })
  .catch(handleError);
