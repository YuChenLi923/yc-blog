import React, {Component} from 'react';
import CardWarper from '../components/common/CardWarper';
import ArticleCard from '../components/pages/ArticleCard';
import {postSeverData} from '../redux/action/action';
import warp from '../components/common/wrapCompontent';
import Loading from '../components/common/Loading';
import '../assets/scss/pages/home.scss';
import { Link } from 'react-router';

class List extends Component {
 render() {
     let { URL, title, id, time } = this.props;
     return (do{
       if (URL) {
         <Link to={URL} target='_blank' className='item'>
           <p className="list">{title}</p>
           <p className='time'>{time}</p>
         </Link>;
       } else {
         <Link className='item'
               to={{pathname: '/article', query: {id}}}>
                 <p className="list">{title}</p>
                 <p className='time'>{time}</p>
         </Link>;
       }
     });
 }
}

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
        let { eassy = [], rencent = [], rss = [], recommend = [] } = data;
        return (
            <Loading>
               <div className = "home">
                <div className = "titleWarp">
                  <h className = "cardTitle left">推荐文章</h>
                </div>
                <CardWarper data = {recommend}
                            template = {ArticleCard}
                            className = 'articleWarp'
                />
                <div className = "titleWarp">
                    <span className = "cardTitle left">最近文章</span>
                </div>
                <CardWarper data = {rencent}
                            template = {ArticleCard}
                            className = 'articleWarp'/>
                 <div className = "warp">
                     <div className = "titleWarp">
                         <span className = "cardTitle left">我的订阅(每周更新)</span>
                     </div>
                     <CardWarper className = "listWarp"
                                 data = {rss}
                                 template={List} />
                 </div>
                <div className="warp">
                    <div className="titleWarp">
                        <span className="cardTitle left">随笔</span>
                      <Link to="/essay">
                        <span className="more">更多</span>
                      </Link>
                    </div>
                    <CardWarper className="listWarp"
                                data = {eassy}
                                template={List}
                    />
                </div>
            </div>
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
