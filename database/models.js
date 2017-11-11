module.exports = {
    users :{
        name : { type : String , required :true},
        password : { type : String , required : true},
        telephone : { type : String },
        email : { type : String },
        imageUpload : [{ imgUrl : String , name : String }]
    }
}