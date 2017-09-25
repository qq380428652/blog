
require('!style-loader!css-loader!./login.css');
let MD5=require('md5.js');

$('#form-login').submit(function (e) { 
    e.preventDefault();
    let [username,password]=[this.username.value,this.password.value];
    if (!username||!password) {
        $('.error-msg').text('用户名或密码不能为空')
        .show()
        .animate({
            display:'none'
        },1500,function(){
            $(this).hide();
        });
        return;

    }
    password=new MD5().update(password).digest('hex');
    $.ajax({
        type: "post",
        url: "/api/user/check",
        data: {
            username,
            password
        },
        success: function (res) {
            $('.error-msg').text(res.message)
            .show()
            .animate({
                display:'none'
            },1500,function(){
                $(this).hide();
                if (res.success) {
                    location.href='/admin'
                }
            });
        }
    });
});