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
            item.title=item.title.substring(0,8)+'...';
            item.cover=item.body.match(/<img.*?(?:>|\/>)/i)||'<img src="/public/img/906877084826210304.jpg" alt="906877084826210304.jpg"/>'
            item.body=item.body.replace(/<[^>]+>/g,"").substring(0,90)+'...';
            return item;
        })
        res.render('index',{
            articles
        });
    })
});
//about页
router.get('/about',(req,res,next)=>{
    res.render('about')
})
//归档页
router.get('/archive',(req,res,next)=>{
    Article.find().sort({
        '_id':-1
    }).then(articles=>{
        res.render('archive',{
            articles
        })
    })
    
})
//404
router.get('/404',(req,res,next)=>{
    res.render('404')
})
//photo
router.get('/photo/:name',(req,res,next)=>{
        res.render('photo')
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


// 移动端淘宝主页
router.get('/taobao',(req,res,next)=>{
    let content_slide=JSON.parse(fs.readFileSync('public/json/content-slide.json','utf-8'))
    res.render('taobao/index',{
        content_slide
    })
})
// pc端美团主页
router.get('/meituan',(req,res,next)=>{
    res.render('meituan/index')
})

module.exports=router;