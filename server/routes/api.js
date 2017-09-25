const express=require('express');

const router=express.Router();

let User=require('../dbmodels/User')

let Article=require('../dbmodels/Article');

let resmsg;

router.use((req,res,next)=>{
    resmsg={
        success:false,
        message:''
    }
    next();
})
//post登录请求
router.post('/user/check',(req,res,next)=>{
    // console.log(req.body);
    let [username,password]=[req.body.username,req.body.password];
    if (!username||!password) {
        resmsg.message='用户名或密码不能为空';
        res.json(resmsg);
        return
    }
    User.findOne({
        username:username,
        password:password
    })
    .then((user)=>{
        if(user){
            resmsg.success=true;
            resmsg.message='登陆成功';
            req.session.user=user;
            res.json(resmsg);
        }else{
            resmsg.message='用户名或密码不正确'
            res.json(resmsg);
        } 
    })
});
//评论提交
router.post('/comment/add:id',(req,resp,next)=>{
    if (!req.body.username||!req.body.usercomment) {
        resmsg.message='用户名或内容不能为空';
        resp.json(resmsg);
        return;
    }else if(req.body.usercomment.search(/[\u4e00-\u9fa5]/g)==-1){
        resmsg.message='我的地盘只需用华语';
        resp.json(resmsg);
        return;
    };
    
    Article.findByIdAndUpdate(req.params.id,{
        $push:{
            comments:{
                    username:req.body.username,
                    body:req.body.usercomment
            }
        }
    }).then(article=>{
        console.log(article.comments)
        resmsg.success = true;
        resmsg.message = '发布成功！';
        resmsg.article = article;
        resp.json(resmsg);
    })
    
});



module.exports=router;