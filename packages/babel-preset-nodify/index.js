'use strict';

const path = require('path');

const nodeVersion = process.versions.node;

const preset = {
  presets: [
    [
      require('babel-preset-env').default,
      {
        targets: {
          node: nodeVersion,
        },
        modules: false,
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'),
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      {
        useBuiltIns: true,
      },
    ],
    // This is so we don't need to add `babel-polyfill` to our webpack `entry`.
    // Unlike `babel-polyfill`, `babel-runtime` + the transform do not pollute
    // the global namespace. Yay.
    // @see https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3#.7j10g8yn0
    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        // Resolve the Babel runtime relative to the config.
        moduleName: path.dirname(require.resolve('babel-runtime/package')),
      },
    ],
  ],
};

if (process.env.NODE_ENV === 'test' || process.env.BABEL_ENV === 'test') {
  preset.plugins.push.apply(preset.plugins, [
    // We always include this plugin regardless of environment
    // because of a Babel bug that breaks object rest/spread without it:
    // https://github.com/babel/babel/issues/4851
    require.resolve('babel-plugin-transform-es2015-parameters'),
    // Jest needs this to work properly with import/export syntax
    [
      require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
      { loose: true },
    ],
  ]);
}

module.exports = preset;
