const path = require('path');

module.exports = {
  entry: './main.js',
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", 
                {pragma: "createElement"}// 自定义方法名
              ]
            ]
          }
        }
      },
      {
        test: /\.view/,
        use: {
          loader: require.resolve("./myloader.js")
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: require.resolve("./cssloader.js") //'css-loader'
        }
      }
    ]
  },
  mode: "development",
  optimization: {
    minimize: false
  }
};