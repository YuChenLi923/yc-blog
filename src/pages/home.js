import React, {Component} from 'react';
import CardWarper from '../components/common/CardWarper';
import ArticleCard from '../components/pages/ArticleCard';
import {postSeverData} from '../redux/action/action';
import warp from '../components/common/wrapCompontent';
import Loading from '../components/common/Loading';
import '../assets/scss/pages/home.scss';

class Home extends Component {
  componentWillMount() {
    let { postSeverData } = this.props;
        postSeverData({
          data: {},
          url: 'yc/getHomeArticleList'
        });
    }
    render() {
        let { data } = this.props;
        data = data || {};
        let { rencent = [] } = data;
        return (
            <Loading>
              <CardWarper data = {rencent}
                          template = {ArticleCard}
                          className = 'articleWarp'
              />
            </Loading>
        );
    }
}
module.exports = warp({
    Target: Home,
    redux: {
        mapDispatchToProps: {postSeverData},
        mapStateToProps: (state) => {
            let { getServerData } = state;
            return {
                data: getServerData.data
            };
        }
    }
});
