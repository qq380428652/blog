

require('jquery-validation');
require('jquery-validation/dist/localization/messages_zh');

var ue = UE.getEditor('body');

$.validator.setDefaults({
	ignore: "",
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if ($(element).is(":radio") || $(element).is(":checkbox")) {
            error.appendTo($(element).parent().parent().parent());
        } else {
            error.appendTo($(element).parent());
        }
    },
    errorClass: "help-block",
    validClass: "help-block"


});

$('#form-article').validate({
    rules:{
        title:{
            required:true,
            maxlength:30
        },
        body:{
            required:true 
        },
        
    },
    messages:{
        title:{
            required:'标题不能为空'
        },
        body:{
            required:'内容不能为空'
        }
    },
    submitHandler:function(form){
        alert('验证通过，可以提交');
        $.ajax({
            url:'/admin/article/update',
            method:'post',
            data:{
                id:$('#id').val(),
                title:$('#title').val(),
                body:ue.getContent()
            },
            success:function(res){
                if(res.success){
                    alert(res.message);
                    location.href='/admin';
                }
            }
        })
    }
});