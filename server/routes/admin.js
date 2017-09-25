const express=require('express');

const Article=require('../dbmodels/Article')

const router=express.Router();

let resmsg;
router.use((req,res,next)=>{
    resmsg={
        success: false,
        message: '',
        data: {
            total: 0,
            rows: []
        }

    };
    next();
})
//主页
router.get('/',(req,res,next)=>{
    res.render('admin/article-list',{
        user:req.session.user
    })
});

//获取所有数据(前端分页)
router.get('/article/list',(req,res,next)=>{
    Article.find().then(articles=>{
        res.json(articles)
    })
});
//获取部分数据（服务端分页）
router.get('/article/pagination',(req,res,next)=>{
    let offset=Number(req.query.offset);
    let limit=Number(req.query.limit);
    let sort=req.query.sort||'_id';
    let order=(req.query.order=='asc'?1:-1);
    Article.count().then(count=>{
        resmsg.data.total=count;
    })
    Article.find().sort({
        [sort]:order
    }).skip(offset).limit(limit).then(articles=>{
        articles.map(item=>{
            item.title=item.title.substring(0,20)+'...';
            item.body=item.body.replace(/<[^>]+>/g,"").substring(0,40)+'...';
        })
        resmsg.success=true;
        resmsg.data.rows=articles;
        res.json(resmsg);
    })
});
//添加文章
router.get('/article/add',(req,res,next)=>{
    res.render('admin/article-add',{
        user:req.session.user
    })
});
//编辑文章
router.get('/article/:id',(req,res,next)=>{
    Article.findById(req.params.id).then(article=>{
        res.render('admin/article-edit',{
            user:req.session.user,
            article:article
        })
    })
});
//编辑完提交文章
router.post('/article/update',(req,res,next)=>{
    Article.findByIdAndUpdate(req.body.id,{
        title:req.body.title,
        cover:req.body.body.match(/<img.*?(?:>|\/>)/i)||'',
        body:req.body.body
    }).then(article=>{
        if (article) {
            // console.log(article.body.match(/<img.*?(?:>|\/>)/i));
            resmsg.success=true;
            resmsg.message='修改成功'
        }else{
            resmsg.message='修改失败'
        }
        res.json(resmsg)
    })
});
//删除文章
router.delete('/article/:id',(req,res,next)=>{
    Article.findOneAndRemove({_id:req.params.id}).then(article=>{
        resmsg.message='删除成功';
        resmsg.success=true;
        res.json(resmsg);
    })
});
//保存文章
router.post('/article/save',(req,res,next)=>{
    new Article({
        title:req.body.title,
        cover:req.body.body.match(/<img.*?(?:>|\/>)/i)||'',
        author:req.session.user.username,
        body:req.body.body
    }).save().then(()=>{
        resmsg.success=true;
        resmsg.message='提交成功'
        res.json(resmsg)
    })
});

module.exports=router;