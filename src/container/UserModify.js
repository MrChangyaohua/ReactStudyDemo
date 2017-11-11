import React from 'react';
import { Link } from 'react-router'

import Login from './Login'

export default React.createClass({
    getInitialState() {
        return {
            username: "",
            password: "",
            rePassword: ""
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
            "uname": this.state.username,
            "upwd": this.state.password
        };
        fetch('/register', {
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
            } else {
                if (res.status == 501) {
                    this.showErr("用户名已经存在", this.refs.username);
                }
            }
        }, (err) => {
            this.refs.err("修改失败");
            this.context.router.push("/modify")
        })
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
                        <li><input name="username" ref="username" value={this.state.uasername} placeholder="请输入用户名" type="text" readonly="true" /></li>
                        <li><input name="telephone" ref="telephone" value={this.state.telephone} placeholder="请输入电话号码" type="text" onChange={this.handleChange} /></li>
                        <li><input name="email" ref="email" value={this.state.email} placeholder="请输入您的邮箱" type="email" onChange={this.handleChange} /></li>
                        <li><input name="login" value="修改" ref="login" type="submit" onClick={this.handleClick} className="box_btn" /> </li>
                        <li><p className="err" ref="err"></p></li>
                    </ul>
                </form>
                <ul className="go">
                    <li className="other"><Link to="Login" >删除此账户</Link></li>
                </ul>
            </div>
        )
    }
});