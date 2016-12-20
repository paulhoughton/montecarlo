import { rollup } from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default({
  entry: 'lib/js/src/monte.js',
  dest: './build/monte.js',
  format: 'iife', 
  exports: 'named',
  moduleName: 'monte', 
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]
})
