


module.exports=(req,res,next)=>{
    if (req.app.locals.isDev) {
        req.session.user={
            username:'大仙',
            password:'111111'
            
        }
    }

    if (req.url.startsWith('/admin')) {
        if (req.session.user) {
            next()
        }else{
            res.redirect('/login');
        }
        
    }else{
        next()
    }
}