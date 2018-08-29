const Post=require('../database/models/Post')

module.exports=async (req,res) =>{
    console.log(req.session.userId);
    Post.find({userid : req.session.userId},(err, posts)=>{
        res.render('myPost',{posts});
    });

}