var express = require('express');
var session = require('express-session');
var router = express.Router();
var fs = require("fs");
var url = require("url");
var csrf = require('csurf');


//判断是否登陆
router.get("/isLogin",(req,res) => {
    var sess = req.session,
        token = sess.token;

    if(sess.user){
        token = token == undefined ? req.csrfToken() : token;
        sess.token = token;

        res.send(JSON.stringify({code : 200 , user : sess.user , token : token}));
    }else{
        res.send(JSON.stringify({code : 403}))
    }
});

//删除图片
router.post("/deleteImages",(req,res) => {
    var User = global.dbHandle.getModel("users"),
        num = req.body.num,
        imgArr = req.session.user.imageUpload,
        imgUrl = imgArr[num].imgUrl,
        filePath = imgUrl.substring(1);

    //本地文件删除
    fs.unlink(filePath,(err) => {
        if(err){
            console.log(err);
        }
    })

    imgArr.splice(num,1);

    User.update({
        name : req.session.user.name
    },{
        imageUpload : imgArr
    },(err) => {
        if(err){
            res.send(500);
        }else{
            req.session.user.imageUpload = imgArr;
            console.log("删除图片后的数组" + JSON.stringify(imgArr));            
            res.send(200);
        }
    })
});

router.get("/",(req,res) => {
    var sess = req.session;
    res.send(200);
})


module.exports = router;

