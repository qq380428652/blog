const express=require('express');

const router=express.Router();

const fs=require('fs');

const Article=require('../dbmodels/Article');

//判断请求方式
router.use((req,res,next)=>{
    res.locals.isAjax=req.xhr;
    next();
})

//主页
router.get(['/'],(req,res,next)=>{
    let page=req.params.page||1;
    let limit=9;
    let offset=limit*(page-1);

    Article.find().sort({
        '_id':-1
    }).skip(offset).limit(9).then(articles=>{
        articles.map(item=>{
            item.title=item.title.substring(0,10)+'...';
            item.cover=item.body.match(/<img.*?(?:>|\/>)/i)||'<img src="/public/img/906877084826210304.jpg" alt="906877084826210304.jpg"/>'
            item.body=item.body.replace(/<[^>]+>/g,"").substring(0,90)+'...';
            return item;
        })
        res.render('index',{
            articles
        });
    })
});
//文章详情页
router.get('/article/detail/:id',(req,res,next)=>{
    let small_img=JSON.parse(fs.readFileSync('public/json/small-img.json','utf-8'))
    Article.findById(req.params.id).then(article=>{
        res.render('article-detail',{
            article,
            small_img
        })
    }).catch(error=>{
        res.render('404')
    })
});
//后台登录页
router.get('/login',(req,res,next)=>{
    res.render('login');
});
//后台退出
router.get('/logout',(req,res,next)=>{
    req.session.user=null;
    res.redirect('login');
})

 

module.exports=router;