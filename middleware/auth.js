const  User=require('../database/models/User')

module.exports=(req,res,next)=>{

    User.findById(req.session.userId,(error,user)=>{ //fetch from database
        if(error||!user){
            return res.redirect('/')

        }
        next()
    })
}