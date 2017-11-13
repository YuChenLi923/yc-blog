import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import App from '../pages/app';
import Home from '../pages/home';
import config from '../../config/blog';
const doc = document,
      app = doc.getElementById('app');
// 异步获取组件
const Share = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/share'));
    }, 'share');
}, Eassy = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/essay'));
    }, 'essay');
}, Reprint = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/reprint'));
  }, 'history');
}, History = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/history'));
    }, 'history');
}, Resoure = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/resoure'));
    }, 'resoure');
}, Article = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/article'));
    }, 'article');
}, Login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/login'));
  }, 'login');
}, Admin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin'));
  }, 'admin');
}, Publish = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/publish'));
  }, 'publish');
}, Manage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/manage'));
  }, 'manage');
}, ResourceAdmin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/resourceAdmin'));
  }, 'manage');
};
const RouteConfig = (
    <Router history={browserHistory}>
        <Route path={config.rootPath} component={App}>
            <IndexRoute component={Home}/>
            <Route path='share' getComponent={Share}/>
            <Route path='essay' getComponent={Eassy}/>
            {/* <Route path='reprint' getComponent={Reprint}/> */}
            <Route path='history' getComponent={History}/>
            <Route path='resoure' getComponent={Resoure}/>
            <Route path='article' getComponent={Article}/>
        </Route>
        <Route path='login' getComponent={Login}/>
      <Route path='admin' getComponent={Admin}>
        <IndexRoute getComponent={Publish}/>
        <Route path='edit' getComponent={Publish}/>
        <Route path='publish' getComponent={Publish}/>
        <Route path='manage' getComponent={Manage}/>
        <Route path='resource' getComponent={ResourceAdmin}/>
        <Redirect from='*' to='publish' />
      </Route>
        <Redirect from='*' to='/' />
    </Router>
);
module.exports = RouteConfig;
