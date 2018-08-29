const Post=require('../database/models/Post');
module.exports=(req,res)=>{
    console.log("Id : " + req.params.id);
    Post.findByIdAndRemove(req.params.id,{
    },(error,post)=>{
        if(error) throw error;
        console.log("Post : " + post);
        res.redirect('/auth/myPost');
    })
}
