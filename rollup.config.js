import * as path from 'path'
import * as fs from 'fs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import sass from 'sass'

const componentsDir = 'src/components'
const componentsName = fs.readdirSync(path.resolve(componentsDir))
const componentsEntry = componentsName.map(
  (name) => `${componentsDir}/${name}/index.ts`
)

const isProd = process.env.NODE_ENV === 'production'
const BABEL_ENV = process.env.BABEL_ENV

// entry point
const entry = 'src/index.ts'

// babel config
const babelOptions = {
  presets: ["@babel/preset-env"],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  exclude: "**/node_modules/**"
}

const commonPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs({ sourceMap: !isProd }),
  typescript(),
  babel(babelOptions),
  json(),
]

// postcss config
const processScss = function (context) {
  return new Promise((resolve, reject) => {
    sass.compile(
      {
        file: context
      },
      function (err, result) {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
        }
      }
    )
    sass.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css)
        } else {
          reject({})
        }
      },
      function (err) {
        reject(err)
      }
    )
  })
}

const externalConfig = [
  id => /\/__expample__|main.tsx/.test(id),
  'react',
  'react-dom',
  'classname',
  '**/node_modules/**'
]

const esmOutput = {
  preserveModules: true,
  assetFileNames: ({ name }) => {
    const { ext, dir, base } = path.parse(name)
    if (ext !== '.css') return '[name].[ext]'
    // 规范 style 的输出格式
    return path.join(dir, 'style', base)
  }
}

export default () => {
  switch (BABEL_ENV) {
    case 'esm':
      return [
        {
          input: [entry, ...componentsEntry],
          output: { ...esmOutput, dir: 'dist/', format: 'es' },
          external: externalConfig,
          plugins: [postcss({
            extract: true,
            process: processScss
          }), ...commonPlugins]
        },
        {
          input: [entry, ...componentsEntry],
          output: { ...esmOutput, dir: 'dist/type', format: 'es' },
          external: externalConfig,
          plugins: [postcss({
            extract: true,
            process: processScss
          }), ...commonPlugins, dts()]
        }
      ]
  }
}