import React, {Component} from 'react';
import warp from '../common/wrapCompontent';
import Nav from '../common/Nav-router';
import ajax from '../../utils/yc-ajax';
import {Link} from 'react-router';
class SubNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      yearMonths: []
    };
  }
  componentWillMount() {
    ajax.get('yc/getTypes').send().then(({data: result}) => {
      let {data: types} = result;
      types.forEach((item, index) => {
        types[index] = {
          value: item.type,
          url: '/share?type=' + item.type
        };
      });
      this.setState({
        types
      });
    });
    ajax.get('yc/getArticleYearMonth').send().then(({data: result}) => {
      let {data: yearMonths} = result;
      yearMonths.forEach((item, index) => {
        yearMonths[index] = {
          value: item.articleYearMonth,
          url: '/pigeonhole?date=' + item.articleYearMonth
        };
      });
      this.setState({
        yearMonths
      });
    });
  }
  render() {
    let {
      isMobile = null,
      data
    } = this.props;
    let {
      types,
      yearMonths
    } = this.state;
    return (
      <div id="sub-nav">
        <div className='card'>
          <p className='title'>
            分类
            <Link to="/sort" className="title-more">更多</Link>
          </p>
          <Nav items={types} SPA />
        </div>
        <div className='card'>
          <p className='title'>
            归档
            <Link to="/archives" className="title-more">更多</Link>
          </p>
          <Nav items={yearMonths} SPA />
        </div>
        {/* <div className='card'>
          <p className='title'>
            转载
          </p>
        </div> */}
      </div>
    );
  }
}
module.exports = warp({
  Target: SubNav,
  type: 'sub-nav',
  redux: {
    mapStateToProps: (state) => {
      let { deviceChange } = state;
      return {
        isMobile: deviceChange.isMobile
      };
    }
  }
});
