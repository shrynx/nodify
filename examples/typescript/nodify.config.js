const typescript = require('rollup-plugin-typescript');

module.exports = {
  rollup: config => {
    config.input = 'src/index.ts';
    // using unshift here as typescript should be the first plugin
    config.plugins.unshift(typescript());
    
    return config;
  },
};
