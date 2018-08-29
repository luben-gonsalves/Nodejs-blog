const Post=require('../database/models/Post')

module.exports=async (req,res) =>{
    const post=await Post.findById(req.params.id)
     //step by step next line doesnt excutes until this
    res.render('post',{
        post
    })
}
