const Post=require('../database/models/Post')

module.exports=async (req,res) =>{
Post.findByIdAndUpdate(req.params.id,{
    title:req.body.title
},(error,post)=>{
    if(error) throw error;
    console.log("Document changed!");
    res.redirect('/auth/myPost');
})

}