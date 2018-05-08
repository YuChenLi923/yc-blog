import React, {Component} from 'react';
import CardWarper from '../../components/common/CardWarper';
import ArticleCard from '../../components/pages/ArticleCard';
import { getArticleList } from '../../redux/action/action';
import warp from '../../components/common/wrapCompontent';
import Loading from '../../components/common/Loading';
import '../../assets/scss/pages/client/home.scss';
import PageTurn from '../../components/common/PageTurn';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: +this.props.location.query.p || 1
    };
  }
  componentWillReceiveProps(nextProps) {
    let { isMobile, dropTimes: nextDropTimes, icon } = nextProps,
      { dropTimes: curDropTimes } = this.props,
      curP = this.props.location.query.p || 1,
      nextP = nextProps.location.query.p || 1,
      nextType = nextProps.location.query.type;
    if (curP !== nextP && !isMobile && nextP) {
      this.getAjaxData(+nextP, nextType);
      this.setState({
        index: +nextP
      });
    }
    if (curDropTimes !== nextDropTimes && isMobile && icon !== 'get-all-data' && icon !== 'loading') {
      this.getAjaxData(++this.state.index);
      this.setState({
        index: this.state.index
      });
    }
  }
  componentWillMount() {
    this.getAjaxData(this.state.index);
  }
  getAjaxData(page) {
    let { getArticleList, isMobile } = this.props;
    getArticleList({
      page,
      isMobile,
      num: 5,
      type: '全部'
    });
  }
  render() {
    let { index } = this.state;
    let { data = [], isMobile } = this.props;
    return (
      <Loading mobileLoading>
        <CardWarper data = {data.list}
                    template = {ArticleCard}
                    className = 'articleWarp'
        />
        {
          data.sum > 1 && !isMobile &&
          <PageTurn url="/"
                    index={index}
                    sum={data.sum}
          />
        }
      </Loading>
    );
  }
}
module.exports = warp({
    Target: Home,
    redux: {
        mapDispatchToProps: {getArticleList},
        mapStateToProps: (state) => {
            let {articleListData, scrollDS, deviceChange, loadStatus} = state;
            return {
                isMobile: deviceChange.isMobile,
                data: articleListData.data,
                dropTimes: scrollDS.dropTimes,
                icon: loadStatus.icon
            };
        }
    }
});
