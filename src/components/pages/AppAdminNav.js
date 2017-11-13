import React, {Component} from 'react';
import warp from '../common/wrapCompontent';
import Nav from '../common/Nav-router';
class AppAdminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drop: false
        };
    }
    _click(item) {
      if (item.value === '退出') {
        this.loginOut();
      }
    }
    loginOut() {
      global.storage.removeItem('Authorization');
      window.location.href = '/';
    }
    render() {
        let {
            leftNavList,
            index
        } = this.props;
        return (
            <div id="admin-nav">
              <h2 className="admin-title"
              >YC-BLOG-ADMIN</h2>
              <Nav items = {leftNavList}
                   index={index}
                   click={this._click.bind(this)}
                   className="NavList"
                   SPA
              />
            </div>
        );
    }
}
module.exports = warp({
    Target: AppAdminNav,
    type: 'app-admin-nav'
});
