import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'p5maps',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include },
      { test: /\.json$/, loader: 'json', include },
    ],
  },
}
