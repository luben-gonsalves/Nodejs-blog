const User=require('../database/models/User')

module.exports=(req,res)=>{
 User.findOne({email : req.body.email},(err,user)=>{
    console.log("User : " + user);
      if(err)
         throw err;
      if(!user){
        User.create(req.body,(error,user)=>{
            console.log("Username : " + req.body.username);
            if(error)
            {
                //console.log(Object.keys(error.errors).map(key=>error.errors[key].message))
                //const registrationErrors=Object.keys(error.errors).map(key=>error.errors[key].message);
                console.log("email : " + req.body.email);
               // req.flash('registrationErrors',registrationErrors)
                //req.flash('data',req.body)
               return  res.redirect('/auth/register')
            }
            else{
              res.render('index',{
              success_msg : "Registration successful"
              });
            }
        });
      }
      if(user){
          res.render('register',{
            error_msg : "This email in use"
          });
      }
 });

}