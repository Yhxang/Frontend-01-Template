# 组件化

## webpack为组件添加JSX语法

webpack[文档](https://webpack.js.org/concepts/)  
JSX可以脱离react独立存在。  

要安装的包：
* webpack
* webpack-cli
* [babel-loader](https://github.com/babel/babel-loader)
* @babel/core
* @babel/preset-env
* [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 翻译jsx的babel插件
* webpack-dev-server 自动webpack

在webpack.config.js中如下配置，将输出代码编程可读状态
```javascript
module.exports = {
    mode: "development",
    optimization: {
    minimize: false
    }
}
```

通过webpack打包后，把jsx
```javascript
let component = <Cls id="a" />
```
翻译成了
```javascript
var component = /*#__PURE__*/React.createElement(Cls, {
  id: "a"
});
```

jsx中标签小写会认为传入字符串，如果大写会认为是class或Function

JSX父子树构建顺序是先子后父