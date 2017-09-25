


module.exports=app=>{
    
    app.use(require('./auth'))
    
    app.use('/',require('./main'));
    app.use('/api',require('./api'));
    app.use('/admin',require('./admin'))
};