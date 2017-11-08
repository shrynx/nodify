const bucklescript = require('rollup-plugin-bucklescript');

module.exports = {
  rollup: config => {
    config.input = 'src/main.re';
    // using unshift here as bucklescript should be the first plugin
    config.plugins.unshift(bucklescript());
    return config;
  },
};
