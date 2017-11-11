import React from 'react';
import { Link } from 'react-router'

// components
import Register from './Register'
import Home from './Home'

export default React.createClass({
    getInitialState(){
        return {
            username : "",
            password : ""
        }
    },
    showErr(errStr,box){
        let that = this;
        that.refs.err.innerHTML = errStr;
        box.onchange = function(){
            that.refs.err.innerHTML = "";
        }
    },
    handleChange(e){
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    contextTypes : {
        router : React.PropTypes.object
    },
    handleClick(e){
        e.preventDefault();
        if(this.state.username == "" || this.state.username == null){
            this.refs.username.focus();
            this.showErr("用户名不能为空",this.refs.username);
        }else if(this.state.password == ""){
            this.refs.password.focus();
            this.showErr("密码不能为空",this.refs.password);
        }else{
            let data = {
                "uname" : this.state.username,
                "upwd" : this.state.password
            }
            fetch('/login',{
                method : "post",
                credentials: 'include',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }).then((res) => {
                if(res.ok){
                    this.refs.err.innerHTML = "登陆成功！";
                    this.context.router.push("/home");
                }else{
                    if(res.status == 404){
                        this.refs.username.focus();
                        this.showErr("用户名不存在！",this.refs.username);
                    }else if(res.status == 403){
                        this.refs.password.focus();
                        this.showErr("密码错误",this.refs.password);
                    }else{
                        this.showErr("登陆失败",this.refs.username);
                    }
                }
            },(err) => {
                this.showErr("登陆失败",this.refs.username);
            })
        }
    },
    render() {
        return (
            <div className="box">
                <form action="login" method="POST">
                    <h2>登录页</h2>
                    <ul>
                        <li><input name="username" ref="username" value={this.state.username} placeholder="请输入用户名" type="text" onChange={this.handleChange} /></li>
                        <li><input name="password" ref="password" value={this.state.password} placeholder="请输入密码" type="password" onChange={this.handleChange} /></li>
                        <li><input name="login" ref="login" value="登录" type="submit" onClick={this.handleClick} className="box_btn" /> </li>
                        <li><p ref="err" className="err"></p></li> 
                    </ul>                  
                </form>
                <ul className="go">
                    <li className="other"><Link to="Register" >注册</Link></li>
                </ul>
            </div>
        )
    }
});