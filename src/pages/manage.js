import React, {Component} from 'react';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
import CardWarper from '../components/common/CardWarper';
import '../assets/scss/pages/manage.scss';
import Nav from '../components/common/Nav-router';
import {shareType} from '../../config/blog';
import PageTurn from '../components/common/PageTurn';
import Loading from '../components/common/Loading';
import List from '../components/pages/ArticleList';


const navItems = [],
      navIndex = {};
shareType.forEach((value, index) => {
  navItems.push({value: value, url: '/admin/manage?type=' + value});
  navIndex[value] = index + 1;
});
navItems.unshift({value: '全部', url: '/admin/manage?type=全部'});
navIndex['全部'] = 0;

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleType: this.props.location.query.type || navItems[0].value,
      index: +this.props.location.query.p || 1
    };
  }
  componentWillMount() {
    this.getArticleData(this.state.index, this.state.articleType);
  }
  componentWillReceiveProps(nextProps) {
    let curP = this.props.location.query.p,
        nextP = nextProps.location.query.p;
    if (curP !== nextP) {
      this.getArticleData(+nextP, this.state.articleType);
      this.setState({
        index: +nextP
      });
    }
  }
  selectArticleType(item) {
    let articleType = item.value;
    this.getArticleData(1, articleType);
    this.setState({
      articleType,
      index: 1
    });
  }
  getArticleData(page, type) {
    const { postSeverData } = this.props;
    postSeverData({
      url: 'yc/getArticleList',
      data: {
        page,
        num: 10,
        type,
        isMobile: false
      }
    });
  }
  render() {
    let { data = {list: [], sum: 0} } = this.props,
        { index, articleType } = this.state;
    return (
      <div id="yc-admin-manage">
        <h2 className="admin-content-title" id="type">文章类型</h2>
        <Nav className="type-list"
             horizontal
             index={navIndex[articleType]}
             items={navItems}
             click = {this.selectArticleType.bind(this)}
             SPA
        />
        <Loading>
          <div className="article-list">
            <ul className="header">
              <li className="title">标题</li>
              <li className="time">时间</li>
              <li className="type">类型</li>
              <li className="opera">操作</li>
            </ul>
           <CardWarper className = "listWarp"
                       data = { data ? data.list : [] }
                       template={List}
                       parent = {this}
           />
          </div>
          <div className="page-turn">
            <PageTurn url="/admin/manage"
                      index={index}
                      sum={ data ? data.sum : 0}
                      query={{type: articleType}}
            />
          </div>
        </Loading>
      </div>
    );
  }
}
module.exports = warp({
  Target: Manage,
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

