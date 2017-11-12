import React from 'react';
import { Link } from 'react-router'

// components
import Login from './Login'

export default React.createClass({
    getInitialState() {
        return {
            username: "",
            password: "",
            rePassword: "",
            telephone: "",
            email: ""
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
        if (this.state.username == null || this.state.username == "") {
            this.refs.username.focus();
            this.showErr("用户名不能为空", this.refs.username);
        } else if (this.state.password == "") {
            this.refs.password.focus();
            this.showErr("密码不能为空", this.refs.password);
        } else if (this.state.rePassword == "") {
            this.refs.rePassword.focus();
            this.showErr("确认密码不能为空", this.refs.rePassword);
        } else if (this.state.password != this.state.rePassword) {
            this.showErr("密码与确认密码不匹配", this.refs.rePassword);
        } else {
            var data = {
                "uname": this.state.username,
                "upwd": this.state.password,
                "telephone": this.state.telephone,
                "email": this.state.email
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
                    this.refs.err.innerHTML = "注册成功";
                    this.context.router.push("/")
                } else {
                    if (res.status == 501) {
                        this.showErr("用户名已经存在", this.refs.username);
                    }
                }
            }, (err) => {
                this.refs.err("注册失败");
                this.context.router.push("/register")
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
                <form action="/register" method="POST">
                    <h2>注册页</h2>
                    <ul>
                        <li><input name="username" ref="username" value={this.state.uasername} placeholder="请输入用户名" type="text" onChange={this.handleChange} /></li>
                        <li><input name="password" ref="password" value={this.state.password} placeholder="请输入密码" type="password" onChange={this.handleChange} /></li>
                        <li><input name="rePassword" ref="rePassword" value={this.state.rePassword} placeholder="请再次输入密码" type="password" onChange={this.handleChange} /></li>
                        <li><input name="telephone" ref="telephone" value={this.state.telephone} placeholder="请输入电话号码" type="number" onChange={this.handleChange} /></li>
                        <li><input name="email" ref="email" value={this.state.email} placeholder="请输入您的邮箱" type="email" onChange={this.handleChange} /></li>
                        <li><input name="login" value="注册" ref="login" type="submit" onClick={this.handleClick} className="box_btn" /> </li>
                        <li><p className="err" ref="err"></p></li>
                    </ul>
                </form>
                <ul className="go">
                    <li className="other"><Link to="Login" >返回登陆</Link></li>
                </ul>
            </div>
        )
    }
});