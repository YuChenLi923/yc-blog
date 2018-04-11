import React, {Component} from 'react';
import warp from '../common/wrapCompontent';
import Nav from '../common/Nav-router';
import Container from '../common/Container';
import {touchMenuSwitch} from '../../redux/action/action';
import {title, subTitle} from '../../../config/blog';
class AppNav extends Component {
    clickSwitch() {
        this.props.touchMenuSwitch(!this.props.open);
    }
    closeMenu() {
        if (this.props.isMobile) {
            this.props.touchMenuSwitch(false);
        }
    }
    render() {
        let {
            isMobile = null,
            leftNavList,
            index,
            open,
            getClassName
        } = this.props;
        return (
            <Container id="Nav">
               <p className='blog-title'>
                 {title}
               </p>
              <p className='blog-sub-title'>
                {subTitle}
              </p>
              {
                (open || !isMobile) &&
                <div className='menu'>
                  <Nav click = {this.closeMenu.bind(this)} items = {leftNavList} index={index} className="nav-list" horizontal = {!isMobile} SPA/>
                 </div>
              }
              {
                isMobile &&
                <div onClick={this.clickSwitch.bind(this)} className={getClassName('menu-toggle', open ? 'menu-toggle-open' : '')}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
             }
            </Container>
        );
    }
}
module.exports = warp({
    Target: AppNav,
    type: 'App-Nav',
    redux: {
        mapDispatchToProps: {touchMenuSwitch},
        mapStateToProps: (state) => {
            let { deviceChange, menuSwitch } = state;
            return {
                open: menuSwitch.open,
                isMobile: deviceChange.isMobile
            };
        }
    }
});
