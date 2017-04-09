import { resolve } from 'path'
import { optimize } from 'webpack'
import makeRule from 'webpack-make-rule'

const index = resolve(__dirname, './src/index.js')
const immutable = resolve(__dirname, './src/immutable/index.js')
const path = resolve(__dirname, './lib/')

export default {
  entry: {index, immutable},
  output: {
    path,
    filename: '[name].js',
    library: 'ReactReduxConnectHelpers',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      makeRule(/\.jsx?$/, 'standard-loader', {snazzy: true}, 'pre'),
      makeRule(/\.jsx?$/, 'babel-loader')
    ]
  },
  externals: {
    'react-redux': {
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux',
      root: 'ReactRedux'
    }
  },
  plugins: [
    new optimize.UglifyJsPlugin({
      comments: false
    })
  ],
  stats: {
    chunks: true,
    colors: true,
    hash: true,
    version: false,
    timings: true
  }
}
