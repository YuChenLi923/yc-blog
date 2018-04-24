import React, {Component} from 'react';
import '../assets/scss/common/common.scss';
import '../assets/scss/pages/app.scss';
import AppNav from '../components/pages/App-Nav';
import SubNav from '../components/pages/Sub-Nav';
import FloatCards from '../components/common/FloatCards';
import {clickMenuSwitch} from '../redux/action/action';
import warp from '../components/common/wrapCompontent';
import Container from '../components/common/Container';
import LoadingPage from '../components/common/loading-page';
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
        isMobile: false
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
    constructor(props) {
        super(props);
        this.state = {
            contentMinH: 0
        };
    }
    componentWillMount() {
      document.documentElement.setAttribute('type', 'fe');
    }
    componentDidMount() {
        let contentMinH = Math.min(document.documentElement.scrollHeight, document.documentElement.clientHeight) - document.getElementById('Nav').offsetHeight;
        this.setState({
            contentMinH: contentMinH > 0 ? contentMinH : 0
        });
    }
    render() {
       let path = this.props.location.pathname,
           { isMobile, clickMenuSwitch, open } = this.props,
           {contentMinH} = this.state,
           index = routerURL[path],
           NavProps = {
            myselfInfo,
            isMobile,
            leftNavList,
            otherPlatform,
            index
          };
      return (
            <div>
                <AppNav {...NavProps} ref={(elem) => { this.nav = elem; }}/>
                <Container id="body"
                           onClick={() => clickMenuSwitch(false)}
                >
                  <div className= 'content' style={{minHeight: contentMinH}}>
                    {this.props.children}
                  </div>
                  {
                    !isMobile &&
                    <SubNav location={this.props.location}/>
                  }
                </Container>
                <div id="copyright">
                  <span>COPYRIGHT © 2018 宇宸 ALL RIGHTS RESERVED</span>
                  <span className="sep">|</span>
                  <a href="http://w蜀ICP备ww.miibeian.gov.cn/" className="record-card">蜀ICP备17027553号-1</a>
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
