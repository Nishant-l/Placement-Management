const express = require('express');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const layout = require('express-ejs-layouts');
const port = 8080;

const app = express();

app.set('views','views');
app.set('view engine','ejs');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded());
app.use(layout);
app.use(cookieParser());
app.use(session({
    name:'StdInfoMngmtSys',
    secret:'oHoChangeThis54567',
    saveUninitialized:false,
    resave:false,
    store:mongoStore.create({
        mongoUrl:'mongodb://localhost/StduntManageDev',
        autoRemove:'disabled'
    },(err)=>{console.log(`error connecting to mongoDb during session creation ${err}`)}),
    cookie:{
        maxAge: (1000*60*60)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routs'));

app.listen(port,(err)=>{
    if(err){
        console.log(`❌ error starting server ---> ${err}`);
        return;
    }
    console.log(`✅ server is up and running on port ${port}`);
})