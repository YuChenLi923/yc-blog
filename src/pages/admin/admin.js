import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import { adminLeftNavList } from '../../../config/blog';
import Nav from '../../components/pages/AppAdminNav';
import '../../assets/scss/pages/admin/admin.scss';
import ajax from '../../utils/yc-ajax';
const routerURL = {};
adminLeftNavList.forEach(function (item, index) {
  routerURL[item.url] = index;
});
class Admin extends Component {
  componentWillMount() {
    const token = global.storage.getItem('Authorization');
    document.documentElement.setAttribute('type', 'admin');
    if (!token) {
      alert('请登录');
      window.location.href = '/login';
    } else {
      ajax.post('yc/admin/verifyUser').send().then((result) => {
        console.log(result);
      });
    }
  }
  render() {
    return (
      <div id="admin">
        <Nav leftNavList = {adminLeftNavList} index={routerURL[this.props.location.pathname]}/>
        <div id="body">
          {this.props.children}
        </div>
     </div>
    );
  };
}
module.exports = warp({
  Target: Admin
});
