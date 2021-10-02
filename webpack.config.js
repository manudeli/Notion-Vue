const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // node_modules에 axios라는 파일을 제외한 나머지는 무시한다.
        // 다른 패키지를 추가하길 원한다면, || package name
        exclude: /node_modules\/(?!axios)/,
        use: 'babel-loader',
      },
      {
        // 정규 표현식은 test라는 확장자로 지어질 수있다.
        // 이 때, 만약에 정해놓은 정규식에 맞는 값의 유무를 boolean 데이터로 전달한다.
        test: /\.vue$/,
        // 일치하는 값이 있다면, use가 loader를 사용 하도록 한다.
        // loader는 vue 데이터를 가져오는 역할까지만 수행이 가능하다. 즉, 읽을 수 없다는 말이다
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        // order는 오른쪽에서 왼쪽 읽힌다.
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
  devServer: {
    port: 5000,
    // spa의 메인 페이지가 index.html이 되도록 설정.
    historyApiFallback: true,
  },
}
