var express = require('express');
var session = require('express-session');
var router = express.Router();
var formidable = require("formidable");
var path = require('path');
var util = require('util');
var fs = require("fs");
var url = require("url");
var csrf = require('csurf');

// 注册
router.post("/register", (req, res) => {
    var User = global.dbHandle.getModel("users");
    var uname = req.body.uname,
        upwd = req.body.upwd,
        telephone = req.body.telephone,
        email = req.body.email,
        result = {};

    User.findOne({ name: uname }, (err, doc) => {
        if (err) {
            res.rend(500);
        } else if (doc) {
            res.send(501);  //用户名已经存在
        } else {
            User.create({
                name: uname,
                password: upwd,
                telephone: telephone,
                email: email
            }, (err, doc) => {
                if (err) {
                    res.send(500);
                } else {
                    var user = JSON.parse(JSON.stringify(doc));
                    req.session.user = user;
                    res.send(200);  //注册成功
                }
            })
        }
    })
});

//登陆
router.post("/login", (req, res) => {
    var User = global.dbHandle.getModel('users'),
        uname = req.body.uname,
        sess = req.session;

    User.findOne({
        name: uname
    }, (err, doc) => {
        if (err) {
            res.sendStatus(500);      //登陆失败
        } else if (!doc) {
            res.sendStatus(404);      //用户名不存在
        } else {
            if (req.body.upwd != doc.password) {
                res.sendStatus(403);      //密码错误
            } else {
                var user = JSON.parse(JSON.stringify(doc));
                sess.user = user;
                res.sendStatus(200);        //登陆成功
            }
        }
    })
});

// 用户信息修改
router.post("/user_modify", (req, res) => {
    var User = global.dbHandle.getModel("users");
    var name = req.body.name,
        telephone = req.body.telephone,
        email = req.body.email,
        result = {};

    //修改用户信息数据库操作
    var whereStr = { 'name': name };
    var modifyStr = {
        telephone: telephone,
        email: email
    };

    User.update(whereStr, modifyStr, (err, doc) => {
        if (err) {
            res.send(500);
        } else {
            req.session.user.telephone = telephone;
            req.session.user.email = email;
            res.send(200);  //注册成功
        }
    })
});

//用户删除
router.post("/user_delete", (req, res) => {
    var User = global.dbHandle.getModel("users"),
     whereStr = { name: req.body.name };

    User.remove(whereStr, (err) => {
        if (err) {
            res.send(500);
        } else {
            req.session.user = null;
            req.session.token = null;
            res.send(200);
        }
    })
});

//退出登陆
router.post("/logout", (req, res) => {
    req.session.user = null;
    req.session.token = null;
    res.send("200");
});

//上传图片
router.post("/upload", (req, res) => {
    var form = new formidable.IncomingForm(),
        targetDir = path.join(__dirname, "../public/uploadImages"),
        User = global.dbHandle.getModel('users'),
        filesArr = [],
        extName = '',
        times = new Date().getTime(),
        imgArr = req.session.user.imageUpload == undefined ? [] : req.session.user.imageUpload;

    form.encoding = 'utf-8';        //设置编码
    form.uploadDir = targetDir;     //设置上传目录
    form.keepExtensions = true;       //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;       //设置图片大小

    //检验存储上传的文件是否存在
    fs.access(targetDir, (err) => {
        if (err) {
            fs.mkdirSync(targetDir);
        }
        _fileParse();
    });

    function _fileParse() {
        form.on("file", (filed, file) => {
            filesArr.push(file);
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.locals.error = err;
                return;
            }
            for (var obj of filesArr) {
                var filePath = obj.path,
                    fileOleName = obj.name.substring(0, obj.name.lastIndexOf('.')),
                    fileExt = filePath.substring(filePath.lastIndexOf('.')),
                    curTime = new Date().getTime();

                times = times == curTime ? (curTime + 1) : curTime;

                var fileName = times + fileExt,
                    targetFile = path.join(targetDir, fileName);

                fs.renameSync(filePath, targetFile);
                imgArr.push({ imgUrl: `/public/uploadImages/${fileName}`, name: fileOleName });
            }

            User.update(
                {
                    name: req.session.user.name
                },
                {
                    imageUpload: imgArr
                }, (err) => {
                    if (err) {
                        res.send(500);
                    } else{
                        req.session.user.imageUpload = imgArr;
                        console.log("上传图片后的数组" + JSON.stringify(imgArr));
                        res.json(imgArr);
                    }
                })
        })
    }
});

//获取图片
router.get("/getImages", (req, res) => {
    var User = global.dbHandle.getModel("users");
    User.findOne({
        name: req.session.user.name
    }, (err, doc) => {
        if (err) {
            res.send(404);
        } else if (doc) {
            doc = JSON.parse(JSON.stringify(doc));
            if (doc.imageUpload) {
                const imgArray = doc.imageUpload;
                req.session.user.imageUpload = imgArray;
                console.log("获取图片后的数组" + JSON.stringify(imgArray));                
                res.json(imgArray);
            }
        } else {
            res.json([]);
        }
    })
});

router.get("/", (req, res) => {
    var sess = req.session;
    res.send(200);
})




module.exports = router;
