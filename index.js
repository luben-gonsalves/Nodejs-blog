const expressEdge=require('express-edge')
const express=require('express')
const edge=require('edge.js')
const mongoose=require('mongoose') // to interact with mongodb database
const bodyParser=require('body-parser')// help us understand the data which browser sends
const expressSession=require('express-session')
const connectMongo=require('connect-mongo') // to store session data in mongodb database
const connectFlash=require('connect-flash')


const homePageController=require('./controllers/homePage')
const createPostController=require('./controllers/createPost')
const storePostController=require('./controllers/storePost')
const getPostController=require('./controllers/getPost')
const createUserController=require('./controllers/createUser')
const storeUserController=require('./controllers/storeUser')
const loginController=require('./controllers/login')
const loginUserController=require('./controllers/loginUser')
const logoutController=require('./controllers/logout')
const deleteController=require('./controllers/delete')
const myPostController=require('./controllers/myPost')
const getUpdateController=require('./controllers/postUpdate')
const getUpdateControllerpage =require('./controllers/postUpdatepage');




const fileUpload=require('express-fileupload')
const app=new express()
mongoose.connect("mongodb://localhost:27017/new-post", { useNewUrlParser: true }); // to connect to database
app.use(connectFlash());
const mongoStore=connectMongo(expressSession);

//for session
app.use(expressSession({
    secret:'secret',
    store:new mongoStore({ mongooseConnection : mongoose.connection
    })
}))


app.use(fileUpload())
app.use(express.static('public')) // all assets in pubic directory
app.use(expressEdge)
app.set('views', `${__dirname}/views`); // set specific values, path to store our templates

app.use('*',(req,res,next)=>{
// res.locals.success_msg = req.connectFlash('success_msg')
// res.locals.error_msg = req.connectFlash('error_msg')
edge.global('auth',req.session.userId)  //global variable auth
next()
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const storePost=require('./middleware/storePost')
const auth=require('./middleware/auth')
const redirectIfAuthenticated=require('./middleware/redirectIfAuthenticated')


//app.use('/posts/store',storePost)
//app.use('/post/new',auth)


app.get("/",homePageController);
app.get("/post/new",auth,createPostController);
app.post("/posts/store",auth,storePost,storePostController);
app.get("/post/:id",getPostController);
app.get("/auth/logout",logoutController);
app.get("/auth/myPost/",myPostController);
app.get("/auth/login",redirectIfAuthenticated,loginController);
app.post("/users/login",redirectIfAuthenticated,loginUserController);
app.get("/auth/register",redirectIfAuthenticated,createUserController);
app.post("/users/register",redirectIfAuthenticated,storeUserController);
app.get("/auth/editpage/:id",getUpdateControllerpage);
app.post("/auth/edit/:id",getUpdateController);
app.get("/auth/delete/:id",deleteController);


app.listen(4000,()=>{
    console.log('app listening to port 4000')
})