const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');

module.exports = {
  rollup: (config, env) => {
    if (env === 'production') {
      // using resolve as lamdas needs node_modules bundled up
      // and babel-minify is optional but just to reduce size as serverless has a size limit.
      config.plugins.push(resolve(), uglify());
    }
    return config;
  },
};