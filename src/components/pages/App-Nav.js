import React, {Component} from 'react';
import warp from '../common/wrapCompontent';
import Nav from '../common/Nav-router';
import {clickMenuSwitch} from '../../redux/action/action';
import AboutMe from '../../components/pages/aboutme';
import {myselfInfo} from '../../../config/blog';
class AppNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showAboutMe: false
        };
    }
    showAboutMe() {
      this.setState({
        showAboutMe: true
      });
    }
    closeAboutMe() {
      this.setState({
        showAboutMe: false
      });
    }
    render() {
        let {
            isMobile = null,
            leftNavList,
            otherPlatform,
            index,
            open,
            clickMenuSwitch,
            getClassName
        } = this.props;
        let { showAboutMe } = this.state;
        return (
            <div id="Nav"
                 className={getClassName({'open-nav': isMobile && open})}
            >
              {
                isMobile === false &&
                <div className="head-portrait"
                     onMouseEnter = {this.showAboutMe.bind(this)}
                     onMouseLeave = {this.closeAboutMe.bind(this)}
                >
                  {do {
                    if (showAboutMe && !isMobile) {
                      <AboutMe/>;
                    }
                  }}
                </div>
              }
              {
                isMobile &&
                <div className={getClassName('menu-switch', {'menu-switch-close': open})}
                     onClick={() => clickMenuSwitch(!open) }>
                  <i/>
                </div>
              }
               <p className='blog-title' onClick={() => clickMenuSwitch(false) }>{myselfInfo.name + '的博客'}</p>
                <div className='menu' style={open && isMobile ? {left: 0} : {}}>
                  {
                    isMobile &&
                    <div className="head-portrait" />
                  }
                  <Nav click={() => clickMenuSwitch(false) }
                                 items = {leftNavList}
                                 index={index}
                                 className="NavList"
                                 SPA
                      />
                      <Nav className='otherPlatform'
                           items = {otherPlatform}
                           horizontal
                                 disabled
                      />
                      <p id="copyRight">
                        <span>{'COPYRIGHT   ' + myselfInfo.name}</span>
                        <br/>
                        <span> ALL RIGHTS RESERVED</span>
                      </p>
                </div>
            </div>
        );
    }
}
module.exports = warp({
    Target: AppNav,
    type: 'App-Nav',
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
