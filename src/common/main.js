


let modelPath=$('[data-main]').data('main');
console.log(modelPath)

if (modelPath) {
    import('../'+modelPath)
    .then(model=>{
        console.log('模块加载成功')
    }).catch(err=>{
        console.log('模块加载失败')
    })
};
if (!location.pathname.startsWith('/admin')&&!location.pathname.startsWith('/login')) {
    require('jquery-pjax');
}
