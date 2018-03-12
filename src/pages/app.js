import React, {Component} from 'react';
import '../assets/scss/common/common.scss';
import '../assets/scss/pages/app.scss';
import AppNav from '../components/pages/App-Nav';
import FloatCards from '../components/common/FloatCards';
import {clickMenuSwitch} from '../redux/action/action';
import warp from '../components/common/wrapCompontent';
import config from '../../config/blog';
let {
    leftNavList,
    myselfInfo,
    otherPlatform
} = config,
    routerURL = {},
    floatCards = [{
        name: '搜索',
        url: '/search',
        click: clickFloat,
        isMobile: true
    }, {
        name: '问题反馈',
        click: clickFloat,
        isMobile: false
    }, {
        name: '返回顶部',
        click: clickFloat,
        isMobile: true,
        withScroll: true,
        noWarn: true
    }];
leftNavList.forEach(function (item, index) {
    routerURL[item.url] = index;
});
routerURL['article'] = -1;
function clickFloat(name) {
    switch (name) {
        case '返回顶部':
             window.scrollTo(0, 0);
             break;
        case '问题反馈':
            window.open('https://github.com/YuChenLi923/YC-Blog/issues');
            break;
    }
}
class App extends Component {
    componentWillMount() {
      document.documentElement.setAttribute('type', 'fe');
    }
    render() {
       let path = this.props.location.pathname,
           { isMobile, clickMenuSwitch, open } = this.props,
           index = routerURL[path],
           NavProps = {
            myselfInfo,
            isMobile,
            leftNavList,
            otherPlatform,
            index
          };
      return (
            <div className="container">
                <AppNav {...NavProps}/>
                <div id="body"
                     onClick={() => clickMenuSwitch(false)}
                >
                    {this.props.children}
                </div>
                <FloatCards items={ floatCards }/>
            </div>
        );
    }
}
module.exports = warp({
  Target: App,
  redux: {
    mapStateToProps: (state) => {
      let { deviceChange, menuSwitch } = state;
      return {
        isMobile: deviceChange.isMobile,
        open: menuSwitch.open
      };
    },
    mapDispatchToProps: {clickMenuSwitch}
  }
});
