
require('bootstrap-table');
require('bootstrap-table/dist/bootstrap-table.css');
require('bootstrap-table/dist/locale/bootstrap-table-zh-CN')

//格式化日期
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};


$('#table').bootstrapTable({
    
    // url:'/admin/article/list',//客服端分页地址
    url:'/admin/article/pagination',//服务端分页地址
    toolbar: '#toolbar',
    sortOrder:'desc',
    columns:[{
        field:'state',
        checkbox:true
    },{
        field:'_id',
        title:'ID',
        visible:false,
        sortable:true,
    },{
        field:'title',
        title:'标题',
        width:200
    },{
        field:'author',
        title:'作者' ,
        width:80
    },{
        field:'body',
        title:'内容'
    },{
        field:'cover',
        title:'缩略图',
        align:'center',
	width:60
    },{
        field:'time',
        title:'发布时间',
        sortable:true,
        align:'center',
        formatter:value=>{
            if (!value) return '';
            return new Date(value).format('yyyy-MM-dd hh:mm:ss')
        }
    },{
        field:'operate',
        title:'操作',
        width:130,
        align:'center',
        formatter:value=>{
            if (!value) {
                let btnGroup=`<div class="btn-group" role="group">
                                <button id="edit" type="button" class="btn btn-primary">编辑</button>
                                <button id="remove" type="button" class="btn btn-info">删除</button>
                            </div>`;
                return btnGroup
            };
        },
        events:{
            'click #edit':(e,value,row,index)=>{
                e.preventDefault();
                location.pathname='/admin/article/'+row['_id'];
            },
            'click #remove':(e,value,row,index)=>{
                e.preventDefault();
                let isSure=window.confirm('你确定要删除 【'+row['title']+'】吗？');
                if (isSure) {
                    $.ajax({
                        type: "delete",
                        url: '/admin/article/'+row['_id'],
                        success: function (res) {
                            alert(res.message);
                            if (res.success) {
                                console.log('1')
                                $('#table').bootstrapTable('remove',{
                                    field:'_id',
                                    values:[row['_id']]
                                })
                            }
                        }
                    });
                }                
            }
        }
    }],
    pagination:true,
    pageList:[10,20,30,40],
    paginationPreText:'上一页',
    paginationNextText:'下一页',
    showColumns:true,
    showRefresh:true,
    // search:true,//客户端搜索
    classes:'table table-hover table-no-bordered',
    strictSearch:true,
    clickToSelect:true,

    //服务端分页
    sidePagination:'server',
    responseHandler:function(res){
            return res.data
    }
})


$('#plus').click(function (e) { 
    e.preventDefault();
    location.href='admin/article/add'
});
