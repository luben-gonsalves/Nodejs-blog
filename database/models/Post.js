const mongoose=require('mongoose')



const PostSchema=new mongoose.Schema({  //for each document in PostSchema collection
    title:String, // fields
    description: String,
    content: String,
    username:String,
    image:String,
    userid :String,
    createAt:{
        type:Date,
        default:new Date() // data at that moment
    }
})


const Post=mongoose.model('Post',PostSchema) // creating model
module.exports=Post