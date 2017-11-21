import React, {Component} from 'react';
import PageTurn from '../components/common/PageTurn';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
import '../assets/scss/pages/search.scss';
import CardWarper from '../components/common/CardWarper';
import Loading from '../components/common/Loading';
import ArticleCard from '../components/pages/ArticleCard';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
  }
  _search() {
    const searchContent = this.input.value,
          postSeverData = this.props.postSeverData;
    if (searchContent) {
      postSeverData({
        url: 'yc/search',
        data: {
          text: searchContent
        }
      });
    }
  }
  render() {
    let { data } = this.props;
    let { index } = this.state;
    data = data || {list: [], sum: 0};
    return (
      <div id="search">
        <h1 className='title'>文章搜索</h1>
        <div className='search-input'>
          <input placeholder="文章名称、文章标签、类型"
                 onKeyPress={(e) => { e.charCode === 13 && this._search(); } }
                 ref = { (input) => { this.input = input; } }
          />
          <button onClick={this._search.bind(this)}
          >搜索</button>
        </div>
        <Loading mobileLoading>
          <CardWarper
            className="listWarp"
            data = {data.list}
            template={ArticleCard}
          />
          <PageTurn url="/essay" index={index} sum={data.sum} />
        </Loading>
      </div>
    );
  }
}
module.exports = warp({
  Target: Search,
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

