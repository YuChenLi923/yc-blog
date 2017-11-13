import React, {Component} from 'react';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
import '../assets/scss/pages/login.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      keyword: ''
    };
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    document.documentElement.setAttribute('type', 'login');
  }
  login() {
    if (this.state.keyword && this.state.user) {
      const { user, keyword } = this.state;
      this.props.postSeverData({
        url: 'yc/login',
        data: {
          user,
          keyword
        },
        onSuccess: (result, header) => {
          if (result.status === 100) {
            alert('登录成功!');
            global.storage.setItem('Authorization', header.authorization);
            window.location.href = './admin';
          } else {
            alert(result.msg);
          }
        }
      });
    }
  }
  render() {
    const { getClassName } = this.props;
    return (
      <div id="login">
        <h2>后台登录</h2>
        <input onInput= {(e) => { this.setState({ user: e.target.value.trim() }); }} placeholder="用户名" type="text"/>
        <input onKeyPress= { (e) => { if (e.charCode === 13) { this.login(); } } }
               onInput= {(e) => { this.setState({ keyword: e.target.value.trim() }); }}
               placeholder="密码"
               type="password"
        />
        <button className={getClassName({active: this.state.keyword && this.state.user})} onClick={this.login}>登录</button>
      </div>
    );
  }
}

module.exports = warp({
  Target: Login,
  redux: {
    mapDispatchToProps: {postSeverData},
    mapStateToProps: (state) => {
      let {getServerData} = state;
      return {
        data: getServerData.data
      };
    }
  }
});
