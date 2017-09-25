

const webpack=require('webpack');

const path=require('path');


const cleanWebpackPlugin=require('clean-webpack-plugin');

const ExtractTextPlugin=require('extract-text-webpack-plugin');

const srcPath=path.resolve(__dirname,'src');

module.exports={
    entry:{
        'common/main':srcPath+'/common/main.js',
        'common/admin-lib':['jquery','bootstrap','BOOTSTRAT_CSS'],
        'common/lib':['jquery','APP_CSS']
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:8080/public/'
    },   
    devtool:'evel-source-map',
    resolve:{
        modules:[srcPath,'node_modules'],
        alias:{
            SRC:srcPath,
            BOOTSTRAT_CSS:'bootstrap/dist/css/bootstrap.css',
            APP_CSS:'SRC/common/app.css'
        }
    },
    plugins:[
        new cleanWebpackPlugin(['public'],{
            exclude:['ueditor','json']
        }),
        new webpack.ProvidePlugin({
            '$':'jquery',
            'jQuery':'jquery'
        }),
        new ExtractTextPlugin({
            filename:function (getPath) {
                return getPath('css/[name].css').replace('css/common','css')
            },
            allChunks:true
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module:{
        rules:[ 
            {
                test:/\.css$$/,
				use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.(jpg|png)$/,
                use:'url-loader?limit=8192&context=client&name=/img/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader?name=/fonts/[name].[ext]'
                ]
            },
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime','syntax-dynamic-import']
                    }
                }
            }
        ]
    }
};
