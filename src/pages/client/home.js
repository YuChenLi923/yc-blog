import React, {Component} from 'react';
import CardWarper from '../../components/common/CardWarper';
import ArticleCard from '../../components/pages/ArticleCard';
import {getHomeData} from '../../redux/action/action';
import warp from '../../components/common/wrapCompontent';
import Loading from '../../components/common/Loading';
import '../../assets/scss/pages/client/home.scss';
class Home extends Component {
  componentWillMount() {
    this.props.getHomeData();
  }
  render() {
    let { data = [] } = this.props;
    return (
      <Loading>
        <CardWarper data = {data}
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
        mapDispatchToProps: {getHomeData},
        mapStateToProps: (state) => {
            let { articleListData } = state;
            return {
                data: articleListData.data
            };
        }
    }
});
