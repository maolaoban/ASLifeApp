//1.配置打包入口
//2.配置打包出口
//这个文件用nodejs的语法
//需要使用nodejs提供的方法来读取当前目录的绝对路径
const path = require('path');
//引入vue-loader15所依赖的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    module:{//专门用于配置所有的第三方模块的loader加载器
        rules:[//设置第三方加载器的匹配规则
            {
                test: /\.css$/,use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png|jpeg|gif|bpm)$/,use: 'url-loader?esModule=false'
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,use: 'url-loader'
            },{
                test: /\.less$/,use: ['style-loader','css-loader','less-loader']
            },
            {
                test:/\.js$/,use:'babel-loader',exclude: /node_modules/
            },
            {
                test:/\.vue$/,use:'vue-loader'
            }
        ]
    },
    resolve:{
        alias:{
            "vue$":'vue/dist/vue.js'
        }
    },
    plugins:[
        new VueLoaderPlugin() //配置插件节点
    ],
    mode:'production',
    performance: {
        hints: 'warning',
        maxAssetSize: 3000000,//字节，默认250kb(250000)
        maxEntrypointSize:3000000
    }
}