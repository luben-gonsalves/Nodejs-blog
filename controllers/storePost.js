const path=require('path')
const Post=require('../database/models/Post')

module.exports=(req,res)=>{
    const { image }=req.files
    image.mv(path.resolve(__dirname,'..','public/post',image.name),(error,s)=>{
         Post.create({
             ...req.body,
            image:`/post/${image.name}`,
            userid :req.session.userId
        },(error,post)=>{
            console.log("post :"+ post)
            return res.redirect('/')
        })
    })
}