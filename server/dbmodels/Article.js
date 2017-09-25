const mongoose=require('mongoose');
let articleSchema=new mongoose.Schema({
    title:String,
    body:String,
    author:String,
    cover:String,
    comments:[
        {
            username:String,
            body:String,
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    time:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Article',articleSchema);