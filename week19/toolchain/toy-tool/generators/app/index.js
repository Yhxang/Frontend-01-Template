var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    
    collecting() {
        this.log('collecting');
    }

    creating(){
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('lib/createElement.js')
        );
        this.fs.copyTpl(
            this.templatePath('animation.js'),
            this.destinationPath('lib/animation.js')
        );
        this.fs.copyTpl(
            this.templatePath('gesture.js'),
            this.destinationPath('lib/gesture.js')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

        this.fs.copyTpl(
            this.templatePath('main.test.js'),
            this.destinationPath('test/main.test.js')
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.npmInstall([
            "webpack",
            "webpack-cli",
            "webpack-dev-server",
            "html-webpack-plugin",
            "babel-loader",
            "@babel/core",
            "@babel/register",
            "@babel/preset-env",
            "@babel/plugin-transform-react-jsx",
            "mocha",
            "nyc",
            "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul"
        ], {"save-dev": true});  
        // 安装依赖，如果需要安装vue环境，可以再npmInstall一次save-dev设置为false的包
    }
};