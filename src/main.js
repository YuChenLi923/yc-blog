import React from 'react';
import reactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Route from './router/router';
import store from './redux/store/store';
import globalManage from './global/global';
import './assets/scss/common/common.scss';
import { setCurRem } from './utils/yc-mobile';

// 定义全局变量
const doc = document,
      app = doc.getElementById('app');

if (process.env.HOT_ENV && module.hot) {
    reactDOM.unmountComponentAtNode(app);
    module.hot.accept();
}
// 注册页面
setCurRem();
reactDOM.render(<Provider store={store}>{Route}</Provider>, app, () => {
  globalManage(store);
});

