import React from 'react';

export default React.createClass({
    handleCopy(e){
        e.preventDefault();

        let parent = e.target.parentNode,
            item_act_input = parent.querySelector(".item_act_input"),
            range = document.createRange();

        item_act_input.innerHTML = `${location.host}${item_act_input.innerHTML}`;
        range.selectNode(item_act_input);
        window.getSelection().addRange(range);

        let copy = document.execCommand('copy');
        alert("复制成功");
    },
    handleDelete(e){
        e.preventDefault();
        var num = e.target.getAttribute("data-id"),
            url = "/deleteImages",
            parents = e.target.parentNode.parentNode,
            {token} = this.props;

        let isDelete = confirm("确定删除这张图片吗？");

        if(isDelete){
            fetch(url,{
                method : "POST",
                credentials: 'include',
                headers : {
                    'Content-Type' : 'application/json',
                    'X-CSRF-Token': token
                },
                body : JSON.stringify({
                    num : num
                })
            }).then(res => {
                if(res.ok){
                    this.refs.imgbox.removeChild(parents);
                }
            })
        }
    },
    render() {
        let { imageList } = this.props;

        return imageList.length <= 0 ? (<section className="col col_right"></section>) : (
            <section className="col col_right">
                <ul ref="imgbox">
                    {
                        imageList.map( (image, i) => {
                            return (
                                <li key={i} className="item">
                                    <div className="item_img">
                                        <img src={image.imgUrl} alt={image.name}/>
                                    </div>
                                    <div className="item_desc">
                                        <p>{image.name}</p>
                                    </div>
                                    <div className="item_act">
                                        <p className="hide item_act_input" >{image.imgUrl}</p>
                                        <a href={image.imgUrl} className="item_act_copy"  onClick={this.handleCopy}>复制链接</a>
                                        <a href={image.imgUrl} target="_blank" >打开</a>
                                        <a href={image.imgUrl} onClick={this.handleDelete} data-id={i} >删除</a>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
});