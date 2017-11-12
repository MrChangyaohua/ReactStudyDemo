import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react'

export default React.createClass ({
    contextTypes : {
        router : React.PropTypes.object
    },
    render() {
        return (
            <header>
                <h1><Link to="/">基于React实现的前后端分离图片上传系统</Link></h1>
                <nav>                     
                    { this.props.user != undefined ? this.renderLoginedBtn() : this.renderNotLoginBtn() }
                </nav>
            </header>
        )
    },
    renderNotLoginBtn() {
        return (
            <ul>
                <li><Link to="/Login">登录</Link></li>
                <li><Link to="/Register">注册</Link></li>
            </ul>
        )
    },
    renderLoginedBtn(name) {
        var path = {
            pathname:'/user_modify',
            state:this.props.user,
          }
        return (
            <ul>    
                <li><p className="name">{this.props.user.name}</p></li>
                <li><Link to={path} onClick={this.logout}>设置</Link></li>
                <li><Link to='/login' onClick={this.logout}>退出</Link></li>
            </ul>
        )
    }
});