import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import App from '../pages/app';
import Home from '../pages/client/home';
import config from '../../config/blog';
const doc = document,
      app = doc.getElementById('app');
// 异步获取组件
const Share = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/client/share'));
    }, 'share');
}, Eassy = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/client/essay'));
    }, 'essay');
}, Reprint = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/reprint'));
  }, 'Reprint');
}, Resoure = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/resoure'));
    }, 'resoure');
}, Article = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../pages/client/article'));
    }, 'article');
}, Login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/client/login'));
  }, 'login');
}, Admin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin/admin'));
  }, 'admin');
}, Publish = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin/publish'));
  }, 'publish');
}, Manage = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin/manage'));
  }, 'manage');
}, ResourceAdmin = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin/resourceAdmin'));
  }, 'resourceAdmin');
}, Research = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/client/search'));
  }, 'research');
}, AdminSort = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/admin/sort'));
  }, 'AdminSort');
}, Pigeonhole = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/client/pigeonhole'));
  }, 'pigeonhole');
}, Sort = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/client/sort'));
  }, 'sort');
}, Archives = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../pages/client/archives'));
  }, 'archives');
};
const RouteConfig = (
    <Router history={browserHistory}>
        <Route path={config.rootPath} component={App}>
            <IndexRoute component={Home}/>
            <Route path='share' getComponent={Share}/>
            <Route path='essay' getComponent={Eassy}/>
            {/* <Route path='reprint' getComponent={Reprint}/> */}
            <Route path='sort' getComponent={Sort}/>
            <Route path='resoure' getComponent={Resoure}/>
            <Route path='article' getComponent={Article}/>
            <Route path='search' getComponent={Research}/>
            <Route path='pigeonhole' getComponent={Pigeonhole}/>
            <Route path='archives' getComponent={Archives}/>
        </Route>
        <Route path='login' getComponent={Login}/>
      <Route path='admin' getComponent={Admin}>
        <IndexRoute getComponent={Publish}/>
        <Route path='edit' getComponent={Publish}/>
        <Route path='publish' getComponent={Publish}/>
        <Route path='manage' getComponent={Manage}/>
        <Route path='resource' getComponent={ResourceAdmin}/>
        <Route path='sort' getComponent={AdminSort}/>
        <Redirect from='*' to='publish' />
      </Route>
        <Redirect from='*' to='/' />
    </Router>
);
module.exports = RouteConfig;
