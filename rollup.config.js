import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';

const globals = {};

export default {
  input: 'src/index.js',
  output: {
    file: './dist/react-calendar.umd.js',
    format: 'umd'
  },
  name: 'reactCalendar',
  exports: 'named',
  globals,

  sourcemap: true,
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    commonJs({})
  ],
  external: ['react']
};
