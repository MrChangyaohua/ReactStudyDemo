import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import UserModify from './UserModify';

export default React.createClass({
    render(){
        return   (
            <Router history={hashHistory}>
                <Route path='/' component={Login} />            
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/user_modify' component={UserModify}/>
                <Route path='/home' component={Home}/>
            </Router>
        )
    }
})