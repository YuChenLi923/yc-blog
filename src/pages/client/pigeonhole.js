import React, {Component} from 'react';
import CardWarper from '../../components/common/CardWarper';
import ArticleCard from '../../components/pages/ArticleCard';
import warp from '../../components/common/wrapCompontent';
import '../../assets/scss/pages/client/pigeonhole.scss';
import Loading from '../../components/common/Loading';
import {getArticleList, cleartGetData} from '../../redux/action/action';
import PageTurn from '../../components/common/PageTurn';
class pigeonhole extends Component {
  constructor(props) {
      super(props);
      this.state = {
        date: this.props.location.query.date,
        index: +this.props.location.query.p || 1
      };
  }
  componentWillReceiveProps(nextProps) {
    let { isMobile, dropTimes: nextDropTimes, icon } = nextProps,
    { dropTimes: curDropTimes } = this.props,
    curP = this.props.location.query.p || 1,
    nextP = nextProps.location.query.p || 1,
    curDate = this.props.location.query.date,
    nextDate = nextProps.location.query.date;
    if ((curP !== nextP || curDate !== nextDate) && !isMobile && nextP) {
        this.getAjaxData(+nextP, nextDate);
        this.setState({
            index: +nextP,
            date: nextDate
        });
    }
    if (curDropTimes !== nextDropTimes && isMobile && icon !== 'get-all-data') {
        this.getAjaxData(++this.state.index, nextDate);
        this.setState({
            index: this.state.index,
            date: nextDate
        });
    }
  }
  componentWillMount() {
    this.getAjaxData(this.state.index, this.state.date);
  }
  componentWillUnmount() {
    this.props.cleartGetData();
  }
  getAjaxData(page, date) {
    let { getArticleList, isMobile } = this.props;
    getArticleList({
        page,
        date,
        isMobile,
        num: 5
    });
  }
  render() {
    let { index, date } = this.state;
    let {data} = this.props;
    data = data || {list: [], sum: 0};
    return (
        <div className="share">
            <p className="content-top-title">
              <span>日期: </span>
              <span>{date}</span>
            </p>
            <Loading mobileLoading>
                <CardWarper className="listWarp"
                            data = {data.list}
                            template={ArticleCard}
                />
                {
                 data.sum > 1 &&
                 <PageTurn url="/pigeonhole"
                          index={index}
                          sum={data.sum}
                          query={{date}}
                 />
                }
            </Loading>
        </div>
    );
}
}
module.exports = warp({
    Target: pigeonhole,
    redux: {
        mapDispatchToProps: {cleartGetData, getArticleList},
        mapStateToProps: (state) => {
            let { loadStatus, deviceChange, scrollDS, articleListData } = state;
            return {
                data: articleListData.data,
                isMobile: deviceChange.isMobile,
                dropTimes: scrollDS.dropTimes,
                icon: loadStatus.icon
            };
        }
    }
});
