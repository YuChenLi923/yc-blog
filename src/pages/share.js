import React, {Component} from 'react';
import CardWarper from '../components/common/CardWarper';
import ArticleCard from '../components/pages/ArticleCard';
import warp from '../components/common/wrapCompontent';
import {postSeverData, cleartGetData} from '../redux/action/action';
import Nav from '../components/common/Nav-router';
import Loading from '../components/common/Loading';
import '../assets/scss/pages/share.scss';
import PageTurn from '../components/common/PageTurn';
import { shareType } from '../../config/blog';
let navItems = [],
    navIndex = {};
shareType.forEach((value, index) => {
    navItems.push({value: value, url: '/share?type=' + value});
    navIndex[value] = index;
});
class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleType: this.props.location.query.type || navItems[0].value,
            index: +this.props.location.query.p || 1
        };
    }
    componentWillReceiveProps(nextProps) {
        let { isMobile, dropTimes: nextDropTimes, icon } = nextProps,
            { dropTimes: curDropTimes } = this.props,
            curP = this.props.location.query.p,
            nextP = nextProps.location.query.p;
        if (curP !== nextP && !isMobile && nextP) {
            this.getAjaxData(+nextP, this.state.articleType);
            this.setState({
                index: +nextP
            });
        }
        if (curDropTimes !== nextDropTimes && isMobile && icon !== 'get-all-data') {
            this.getAjaxData(++this.state.index, this.state.articleType);
            this.setState({
                index: this.state.index
            });
        }
    }
    componentWillMount() {
        this.getAjaxData(this.state.index, this.state.articleType);
    }
    componentWillUnmount() {
        this.props.cleartGetData();
    }
    getAjaxData(page, type) {
        let { postSeverData, isMobile } = this.props;
        postSeverData({
            data: {
                page: page,
                num: 8,
                type: type,
                isMobile: isMobile
            },
            url: 'yc/getArticleList'
        });
    }
    changeArticleType(item) {
        let articleType = item.value;
        this.getAjaxData(+1, articleType);
        this.setState({
            articleType: articleType,
            index: 1
        });
    }
    render() {
        let { index, articleType } = this.state;
        let {data} = this.props;
      data = data || {list: [], sum: 0};
        return (
            <div className="share">
                <Nav className="list"
                     horizontal
                     index={navIndex[articleType]}
                     items={navItems}
                     click = {this.changeArticleType.bind(this)}
                     SPA
                />
                <Loading mobileLoading>
                    <CardWarper className="listWarp"
                                data = {data.list}
                                template={ArticleCard}
                    />
                    <PageTurn url="/share"
                              index={index}
                              sum={data.sum}
                              query={{type: articleType}}
                    />
                </Loading>
            </div>
        );
    }
}
module.exports = warp({
    Target: Share,
    redux: {
        mapDispatchToProps: {postSeverData, cleartGetData},
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
