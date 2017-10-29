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
  },
  sourcemap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: basePresets,
    }),
    resolve(),
    commonjs(),
    json(),
  ],
  external: external(),
};

module.exports = config;
