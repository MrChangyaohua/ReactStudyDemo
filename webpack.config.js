const path = require('path');

module.exports = {    
    entry: './src/index.js',
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: './build/index.js'//打包后输出文件的文件名
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }
        ]
    }
}