'use strict';

const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const external = require('@yelo/rollup-node-external');
const paths = require('./paths');
const basePresets = require('./babel.js');

const config = {
  input: paths.srcPath,
  output: {
    file: paths.buildPath,
    format: 'cjs',
    banner: `require('${require
      .resolve('source-map-support')
      .indexOf(process.cwd()) === 0
      ? 'source-map-support/register'
      : require.resolve('source-map-support/register')}')`,
  },
  sourcemap: true,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: true,
      presets: basePresets,
    }),
    commonjs(),
    json(),
  ],
  external: external(),
};

module.exports = config;
