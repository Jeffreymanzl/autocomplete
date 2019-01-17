console.log('/autocomplete-vue/rollup.config.js')
import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify-es'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'index.js',
  output: {
    name: 'Autocomplete',
    exports: 'named'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    vue({
      css: false,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    babel({
      exclude: 'node_modules/**',
      configFile: path.resolve(__dirname, '..', '..', 'babel.config.js')
    }),
    buble()
  ]
}

// Only minify iife version
if (argv.format === 'iife' || argv.f === 'iife') {
  console.log('argv.format === iife')
  config.plugins.push(uglify())
}

export default config