'use strict';

const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const paths = require('./paths');
const basePresets = require('../babel.js');

const config = env => ({
  input: paths.srcPath,
  output: {
    file: paths.buildPath,
    format: 'cjs',
    banner:
      env !== 'production'
        ? `require('${
            require.resolve('source-map-support').indexOf(process.cwd()) === 0
              ? 'source-map-support/register'
              : require.resolve('source-map-support/register')
          }')`
        : '',
  },
  sourcemap: env !== 'production',
  plugins: [
    json(),
    babel({
      babelrc: true,
      presets: basePresets,
    }),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  ],
});

module.exports = config;
