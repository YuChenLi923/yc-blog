import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import {getArticeDataAdmin} from '../../redux/action/action';
import CardWarper from '../../components/common/CardWarper';
import '../../assets/scss/pages/admin/manage.scss';
import Nav from '../../components/common/Nav-router';
import PageTurn from '../../components/common/PageTurn';
import Loading from '../../components/common/Loading';
import List from '../../components/pages/ArticleList';
import ajax from '../../utils/yc-ajax';


class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTypes: [],
      typeIndex: {},
      articleType: this.props.location.query.type || '',
      index: +this.props.location.query.p || 1
    };
  }
  componentWillMount() {
    ajax.get('yc/getArticleTypes').send().then(({data: result}) => {
      if (result.status === 100) {
        let {data: {types: articleTypes}} = result,
            articleType;
        articleTypes.unshift('全部');
        articleTypes.forEach((item, index) => {
          articleTypes[index] = {
            value: item,
            url: `/admin/manage?type=${item}`
          };
          this.state.typeIndex[item] = index;
        });
        articleType = this.state.articleType || articleTypes[0].value;
        this.setState({
          articleTypes,
          articleType: articleType
        });
      }
    });
    this.props.getArticeDataAdmin(this.state.index, this.state.articleType);
  }
  componentWillReceiveProps(nextProps) {
    let curP = this.props.location.query.p,
        nextP = nextProps.location.query.p;
    if (curP !== nextP) {
      this.props.getArticeDataAdmin(+nextP, this.state.articleType);
      this.setState({
        index: +nextP
      });
    }
  }
  selectArticleType(item) {
    let articleType = item.value;
    this.props.getArticeDataAdmin(1, articleType);
    this.setState({
      articleType,
      index: 1
    });
  }
  render() {
    let { data = {list: [], sum: 0} } = this.props,
        { index, articleType, articleTypes, typeIndex } = this.state;
    return (
      <div id="yc-admin-manage">
        <h2 className="admin-content-title" id="type">文章类型</h2>
        <Nav className="type-list"
             horizontal
             index={typeIndex[articleType]}
             items={articleTypes}
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
          {
            data.sum > 1 &&
            <div className="page-turn">
              <PageTurn url="/admin/manage"
                        index={index}
                        sum={ data ? data.sum : 0}
                        query={{type: articleType}}
              />
            </div>
          }
        </Loading>
      </div>
    );
  }
}
module.exports = warp({
  Target: Manage,
  redux: {
    mapDispatchToProps: {getArticeDataAdmin},
    mapStateToProps: (state) => {
      let {articleListData} = state;
      return {
        data: articleListData.data
      };
    }
  }
});

