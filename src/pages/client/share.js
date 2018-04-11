import React, {Component} from 'react';
import CardWarper from '../../components/common/CardWarper';
import ArticleCard from '../../components/pages/ArticleCard';
import warp from '../../components/common/wrapCompontent';
import {getArticleList, cleartGetData} from '../../redux/action/action';
import Loading from '../../components/common/Loading';
import '../../assets/scss/pages/client/share.scss';
import PageTurn from '../../components/common/PageTurn';
class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleType: this.props.location.query.type,
            index: +this.props.location.query.p || 1
        };
    }
    componentWillReceiveProps(nextProps) {
        let { isMobile, dropTimes: nextDropTimes, icon } = nextProps,
            { dropTimes: curDropTimes } = this.props,
            curP = this.props.location.query.p || 1,
            nextP = nextProps.location.query.p || 1,
            curType = this.props.location.query.type,
            nextType = nextProps.location.query.type;
        if ((curP !== nextP || curType !== nextType) && !isMobile && nextP) {
            this.getAjaxData(+nextP, nextType);
            this.setState({
                index: +nextP,
                articleType: nextType
            });
        }
        if (curDropTimes !== nextDropTimes && isMobile && icon !== 'get-all-data' && icon !== 'loading') {
            this.getAjaxData(++this.state.index, nextType);
            this.setState({
                index: this.state.index,
                articleType: nextType
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
        let { getArticleList, isMobile } = this.props;
        getArticleList({
            page,
            type,
            isMobile,
            num: 5
        });
    }
    render() {
        let { index, articleType } = this.state;
        let {data, isMobile} = this.props;
        data = data || {list: [], sum: 0};
        return (
            <div className="share">
                <p className="content-top-title">
                  <span>分类: </span>
                  <span>{articleType}</span>
                </p>
                <Loading mobileLoading>
                    <CardWarper className="listWarp"
                                data = {data.list}
                                template={ArticleCard}
                    />
                    {
                     data.sum > 1 && !isMobile &&
                     <PageTurn url="/share"
                              index={index}
                              sum={data.sum}
                              query={{type: articleType}}
                     />
                    }
                </Loading>
            </div>
        );
    }
}
module.exports = warp({
    Target: Share,
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
