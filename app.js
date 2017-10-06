const express=require('express');

const swig=require('swig');

const path=require('path');

const session=require('express-session');

const bodyParser=require('body-parser');

const mongoose = require('mongoose');

const ueditor = require("ueditor");

const app=express();


app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.use(session({
    secret:'woqu',
    resave: false, //是否重新保存会话
    saveUninitialized: true //自动初始化会话
}))

const isDev=process.env.NODE_ENV;
app.locals.isDev=isDev;

app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');


//-------------------ueditor---------------
app.use('/ueditor',express.static(__dirname+'/public/ueditor'))
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

    var imgDir = '/ueditor/upload/img' //默认上传地址为图片
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/ueditor/upload/file'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/ueditor/upload/video'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage'){
    
        res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/ueditor/nodejs/config.json')
}}));
//--------------------------------------


require('./server/routes/routes')(app);



if (isDev) {
    swig.setDefaults({
        cache:false
    })


    const webpack=require('webpack');
    const webpackConfig=require('./webpack.config.js');
    const compiler=webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler,{
        noInfo:true,
        stats:{
            color:true
        },
        publicPath:webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    //---------------------------------
    
    
    
    
    const browserSync=require('browser-sync').create();
    
    const reload=require('reload');
    const http=require('http');
    const server=http.createServer(app);
    reload(app);
    server.listen(8080,()=>{
        browserSync.init({
            ui:false,
            open:false,
            online:false,
            notify:false,
            online: false,
            proxy:'localhost:8080',
            files:'./server/views/**',
            post:3000
        },()=>console.log('服务器启动'))
        
    });
    
}else{
    app.use('/public', express.static(__dirname + '/public'));
    
    app.listen(8080,()=>{
            console.log('服务器启动');
    })
}

mongoose.connect('mongodb://localhost:27017/blog',{useMongoClient: true})
.on('open',(db)=>{
    console.log('数据库连接成功');
})
.on('error',(error)=>{
    console.log('数据库连接失败');
})


