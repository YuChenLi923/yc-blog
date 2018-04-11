import React, {Component} from 'react';
import PageTurn from '../../components/common/PageTurn';
import warp from '../../components/common/wrapCompontent';
import {getSearchResult} from '../../redux/action/action';
import '../../assets/scss/pages/client/search.scss';
import CardWarper from '../../components/common/CardWarper';
import Loading from '../../components/common/Loading';
import ArticleCard from '../../components/pages/ArticleCard';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
  }
  _search() {
    const searchContent = this.input.value;
    if (searchContent) {
      this.props.getSearchResult(searchContent);
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
          <input placeholder="文章标题"
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
          {
            data.sum > 1 &&
            <PageTurn url="/essay" index={index} sum={data.sum} />
          }
        </Loading>
      </div>
    );
  }
}
module.exports = warp({
  Target: Search,
  redux: {
    mapDispatchToProps: {getSearchResult},
    mapStateToProps: (state) => {
      let {articleListData} = state;
      return {
        data: articleListData.data
      };
    }
  }
});

