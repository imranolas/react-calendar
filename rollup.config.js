import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';
import uglify from 'rollup-plugin-uglify-es';
import es3 from 'rollup-plugin-es3';
import filesize from 'rollup-plugin-filesize';

const { peerDependencies } = require('./package.json');
const external = Object.keys(peerDependencies || {});

// https://github.com/developit/microbundle/blob/master/src/index.js#L150
const globals = external.reduce( (globals, name) => {
  // valid JS identifiers are usually library globals:
  if (name.match(/^[a-z_$][a-z0-9_$]*$/)) {
    globals[name] = name;
  }
  return globals;
}, {});

const plugins = [
  commonjs({
    include: 'node_modules/**'
  }),
  nodeResolve({
    browser: true,
    module: true,
    jsnext: true
  }),
  babel({
    exclude: 'node_modules/**',
    externalHelpers: true
  }),
  flow({
    all: true,
    pretty: true
  }),
  es3()
];

const prodPlugins = [
  ...plugins,
  uglify(),
  filesize()
];

const name = 'ReactCalendar';

const withBase = config => ({
  ...config,
  input: 'src/index.js',
  external,
});

const umdBase = {
  name,
  exports: 'named',
  globals
};

export default [
  {
    output: [{
      file: './dist/react-calendar.min.js',
      format: 'umd',
      ...umdBase
    }],
    plugins: prodPlugins
  }, {
    output: [{
      file: './dist/react-calendar.js',
      format: 'umd',
      ...umdBase
    }, {
      file: './dist/react-calendar.es.js',
      format: 'es'
    }, {
      file: './dist/react-calendar.cjs.js',
      format: 'cjs'
    }],
    plugins
  }
].map(withBase);
