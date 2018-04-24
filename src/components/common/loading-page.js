import React, {Component} from 'react';
import classnames from 'classnames';
import '../../assets/scss/components/loding-page.scss';
class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    console.log(3231, this);
  }
  render() {
    let {loaded} = this.state;
    return (
      <div className="yc-loading-page">
        正在加载中
        <div className={classnames({'page-content-hidden': !loaded})}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
module.exports = LoadingPage;
