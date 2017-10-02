

const webpack=require('webpack');

const path=require('path');


const cleanWebpackPlugin=require('clean-webpack-plugin');

const srcPath=path.resolve(__dirname,'src');

module.exports={
    entry:{
        'common/main':[srcPath + '/common/main.js', 'webpack-hot-middleware/client?reload=true'],
        'common/admin-lib':['jquery','bootstrap','BOOTSTRAT_CSS'],
        'common/lib':['jquery','APP_CSS']
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:3000/public'
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
        //--------------
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
        //-------------
    ],
    module:{
        rules:[ 
            {
                test:/\.css$$/,
				use:[
					"style-loader",
                    "css-loader?sourceMap",
                ]
            },
            {
                test:/\.(jpg|png)$/,
                use:'url-loader?name=/img/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader'
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