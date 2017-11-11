import React from 'react';

export default React.createClass({
    contextTypes : {
        router : React.PropTypes.object
    },
    handleUpload(e) {
        let isAllImage = true;
        let { uploadFuc } = this.props;
        //判断是否都是图片
        for(let val of this.refs.upload.files){
            let _type = val.type;
            if(!_type.includes("image")){
                isAllImage = false;
                this.showErr("只能上传图片",3000);
                return false;
            }
        }
        //全是图片
        if(isAllImage){
            this.refs.formupload.submit();
            setTimeout(function(){
                location.reload();
            },500)
            // 本地读取
            // for(let val of this.refs.upload.files){
            //     let ofReader = new FileReader();
            //     let newImageArr = [];

            //     ofReader.readAsDataURL(val);
            //     ofReader.onload = function(e){
            //         var img = {
            //             imgUrl : e.target.result,
            //             name : val.name
            //         };
            //         newImageArr.push(img);
            //         uploadFuc(newImageArr)
            //     }
            // }
            // uploadFuc()

        }
    },
    showErr(errStr,time){
        this.refs.err.innerHTML = errStr;
        setTimeout(() => {
            this.refs.err.innerHTML = "";
        },time)
    },
    uploadForm() {
        return (
            <section className="col col_left">
                <div className="upload_wrap">
                    <em>上传图片</em>
                    <form action="/upload" method="POST" encType="multipart/form-data" role="form" ref="formupload" target="showResult">
                        <input type="file" multiple="multiple" accept="image/*" ref="upload" name="upload" className="upload" onChange={this.handleUpload} />
                    </form>
                    <p className="err" ref="err"></p>
                    <iframe ref="showResult" className="result" name="showResult"></iframe>
                </div>
            </section>
        )
    },
    render() {
        let { user }  = this.props;
        return user.length > 0 ? this.uploadForm() : (<p></p>);
    }
})