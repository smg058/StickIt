import terser from '@rollup/plugin-terser'
import eslint from '@rollup/plugin-eslint'
import fs from 'node:fs'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const banner = `
  /*!
   * Stick it v${pkg.version} - ${pkg.description}
   * Author: ${pkg.author.name} <${pkg.author.email}> <${pkg.author.url}>
   * URL: ${pkg.homepage}
   * License: ${pkg.license}
   */
`

export default [
  {
    input: 'src/stick-it.js',
    output: {
      file: 'dist/stick-it.js',
      format: 'umd',
      name: 'StickIt',
      banner
    },
    plugins: [
      eslint({ fix: true })
    ]
  },
  {
    input: 'src/stick-it.js',
    output: {
      file: 'dist/stick-it.min.js',
      format: 'umd',
      name: 'StickIt',
      banner,
      sourcemap: true
    },
    plugins: [
      eslint({ fix: true }),
      terser({
        compress: {
          passes: 2
        },
        mangle: true
      })
    ]
  },
  {
    input: 'src/stick-it.js',
    output: {
      file: 'dist/stick-it.esm.js',
      format: 'es'
    },
    plugins: [
      eslint(),
      terser({
        compress: {
          passes: 2
        },
        mangle: true
      })
    ]
  }
]
