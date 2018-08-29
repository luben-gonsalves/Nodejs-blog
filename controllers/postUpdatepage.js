
module.exports=async (req,res) =>{
    var id = req.params.id;
     //step by step next line doesnt excutes until this
    res.render('postUpdate',{
       id
    });
}
