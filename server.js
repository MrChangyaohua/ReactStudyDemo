var express = require('express');
var cookieParser = require("cookie-parser");
var csrf = require('csurf');
var mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var checkedRoutes = require('./routes/checkedIndex');


global.dbHandle = require('./database/dbHandle');
global.db = mongoose.connect("mongodb://localhost:27017/uploadimgdb");

var app = express();

app.use(cookieParser());
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(session({
    secret : 'hello',
    resave : false,
    saveUninitialized : true,
    cookie : {
        path : "/",
        maxAge : 600000
    }
}))

app.use("/",routes);
app.use('/upload', routes);
app.use('/register', routes);
app.use('/login', routes);
app.use('/logout', routes);
app.use('/getImages', routes);

// csrf防御
app.use(csrf());
app.use("/",checkedRoutes);
app.use('/isLogin', checkedRoutes);
app.use('/deleteImages', checkedRoutes);


//error handle
app.use((err,req,res,next) => {
    res.status(err.status || 500);
})

var PORT = process.env.PORT || 9990;
app.listen(PORT,function(){
    console.log('Production Express server running at localhost:' + PORT)
})