import React from 'react';
import { Link } from 'react-router'


export default React.createClass({
    getInitialState() {
        var user = this.props.location.state;
        return {
            username: user.name,
            telephone: user.telephone,
            email: user.email
        }
    },
    handleChange(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleClick(e) {
        e.preventDefault();
        var data = {
            "name": this.state.username,
            "telephone": this.state.telephone,
            "email": this.state.email
        };
        fetch('/user_modify', {
            method: "post",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
                this.refs.err.innerHTML = "修改成功";
                setTimeout(() => {
                    this.context.router.push("/home")
                }, 1000)
            } 
        }, (err) => {
            this.refs.err.innerHTML("修改失败");
            this.context.router.push("/modify")
        })
    },
    handleDelete(e){
        e.preventDefault();
        var username = this.state.username,
            url = "/user_delete",
            token = this.props.token;

        let isDelete = confirm("确定删除这个账号吗？一旦删除，您所有的信息都无法找回。");

        if(isDelete){
            fetch(url,{
                method : "POST",
                credentials: 'include',
                headers : {
                    'Content-Type' : 'application/json',
                    'X-CSRF-Token': token
                },
                body : JSON.stringify({
                    name : username
                })
            }).then(res => {
                if(res.ok){
                    this.refs.err.innerHTML = "此用户账户已删除";
                    setTimeout(() => {
                    this.context.router.push("/login");
                }, 1000)
                }
            })
        }
    },
    showErr(errStr, box) {
        var that = this;
        that.refs.err.innerHTML = errStr;
        box.onchange = function () {
            that.refs.err.innerHTML = "";
        }
    },
    render() {
        return (
            <div className="box">
                <form action="/user_modify" method="POST">
                    <h2>用户信息修改页</h2>
                    <ul>
                        <li><p> 当前用户名： {this.state.username} </p></li>
                        <li>手机号码:<input name="telephone" ref="telephone" value={this.state.telephone} placeholder="请输入电话号码" type="number" onChange={this.handleChange} /></li>
                        <li>电子邮箱:<input name="email" ref="email" value={this.state.email} placeholder="请输入您的邮箱" type="email" onChange={this.handleChange} /></li>
                        <li><input name="modify" value="修改" ref="modify" type="submit" onClick={this.handleClick} className="box_btn" /> </li>
                        <li><p className="err" ref="err"></p></li>
                    </ul>
                </form>
                <ul className="go">
                    <li className="other"><a href="javascript:void(0)" onClick={this.handleDelete} >删除此账户</a></li>
                </ul>
            </div>
        )
    }
});