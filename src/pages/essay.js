import React, {Component} from 'react';
import CardWarper from '../components/common/CardWarper';
import PageTurn from '../components/common/PageTurn';
import ArticleCard from '../components/pages/ArticleCard';
import warp from '../components/common/wrapCompontent';
import Loading from '../components/common/Loading';
import {postSeverData} from '../redux/action/action';
import '../assets/scss/pages/eassy.scss';
import { shareType } from '../../config/blog';
let navItems = [];
shareType.forEach((value) => { navItems.push({value: value}); });
class Essay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: !this.props.isMobile ? +this.props.location.query.p || 1 : 1
        };
        this.getAjaxData = this.getAjaxData.bind(this);
    }
    getAjaxData(page) {
        let { postSeverData, isMobile } = this.props;
        postSeverData({
            data: {
              page: page,
              num: 8,
              type: '随笔',
              isMobile
            },
            url: 'yc/getArticleList'
        });
    }
    componentWillReceiveProps(nextProps) {
        let { isMoblie, dropTimes: nextDropTimes, icon } = nextProps,
            { dropTimes: curDropTimes } = this.props,
            curP = this.props.location.query.p,
            nextP = nextProps.location.query.p;
        if (curP !== nextP && !isMoblie) {
          this.getAjaxData(+nextP);
          this.setState({
            index: +nextP
          });
        }
        if (curDropTimes !== nextDropTimes && isMoblie && icon !== 'get-all-data') {
          this.getAjaxData(++this.state.index);
          this.setState({
            index: ++this.state.index
          });
        }
    }
    componentWillMount() {
        this.getAjaxData(this.state.index);
    }
    render() {
        let { index } = this.state;
        let { data } = this.props;
        data = data || {list: [], sum: 0};
        return (
            <div className="eassy">
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
    Target: Essay,
    redux: {
        mapDispatchToProps: {postSeverData},
        mapStateToProps: (state) => {
            let { getServerData, deviceChange, scrollDS } = state;
            return {
                data: getServerData.data,
                isMobile: deviceChange.isMobile,
                dropTimes: scrollDS.dropTimes,
                icon: getServerData.icon
            };
        }
    }
});
