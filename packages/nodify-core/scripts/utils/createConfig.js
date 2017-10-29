'use strict';

function ensureArray(thing) {
  if (Array.isArray(thing)) {
    return thing;
  }
  if (thing === undefined) {
    return [];
  }
  return [thing];
}

function createConfig(config) {
  const inputOptions = {
    input: config.input,
    legacy: config.legacy,
    treeshake: config.treeshake,
    acorn: config.acorn,
    context: config.context,
    moduleContext: config.moduleContext,
    plugins: config.plugins,
    onwarn: config.onwarn,
    watch: config.watch,
  };

  // legacy, to ensure e.g. commonjs plugin still works
  inputOptions.entry = inputOptions.input;

  const configExternal = config.external;

  if (typeof configExternal === 'function') {
    inputOptions.external = id => configExternal(id);
  } else {
    inputOptions.external = configExternal || [];
  }

  const baseOutputOptions = {
    extend: config.extend,
    amd: Object.assign({}, config.amd),

    banner: config.banner,
    footer: config.footer,
    intro: config.intro,
    outro: config.outro,
    sourcemap: config.sourcemap,
    name: config.name,
    globals: config.globals,
    interop: config.interop,
    legacy: config.legacy,
    indent: config.indent,
    strict: config.strict,
    noConflict: config.noConflict,
    paths: config.paths,
  };

  let mergedOutputOptions;
  if (config.output) {
    mergedOutputOptions = [Object.assign({}, config.output)];
  } else {
    mergedOutputOptions = ensureArray(config.output);
  }

  const outputOptions = mergedOutputOptions.map(output =>
    Object.assign({}, baseOutputOptions, output)
  );

  return { inputOptions, outputOptions };
}

module.exports = createConfig;
