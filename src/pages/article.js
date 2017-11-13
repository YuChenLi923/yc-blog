import React, {Component} from 'react';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
import { Link } from 'react-router';
import Loading from '../components/common/Loading';
import '../assets/scss/pages/article.scss';
import '../assets/scss/highlight/atom-one-dark.scss';
class Article extends Component {
    constructor(props) {
      super(props);
      this.getArticle = this.getArticle.bind(this);
    }
    componentWillMount() {
       this.getArticle(this.props.location.query.id || '');
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location.query.id !== undefined &&
        nextProps.location.query.id !== this.props.location.query.id) {
        this.getArticle(nextProps.location.query.id || '');
      }
    }
    getArticle(id) {
      let { postSeverData } = this.props;
      postSeverData({
        data: {
          id
        },
        url: 'yc/getArticleText'
      });
    }
    render() {
        let {data = {}} = this.props,
            { html, time, type, lastArticle, nextArticle } = data;
        return (
          <div id="article">
            <Loading >
              <div className="clear-float">
                {do{
                  if (lastArticle) {
                    <div className="article-to article-to-last">
                      <Link to = {{pathname: '/article', query: {id: lastArticle.id}}}>
                        <p>{lastArticle.title}</p>
                      </Link>
                    </div>;
                  }
                }}
                {do{
                  if (nextArticle) {
                    <div className="article-to article-to-next">
                      <Link to = {{pathname: '/article', query: {id: nextArticle.id}}}>
                        <p>{nextArticle.title}</p>
                      </Link>
                    </div>;
                  }
                }}
              </div>
              <div className="article-body">
                <div className="article-base-info">
                  <div className="item float-left">
                    <span className="item-title">时间:</span>
                    <span className="item-text">{time}</span>
                  </div>
                  <div className="item float-right">
                    <span className="item-title">类别:</span>
                    <span className="item-text">{type}</span>
                  </div>
                </div>
                <div className="article-content" dangerouslySetInnerHTML={{__html: html}}/>
              </div>
            </Loading>
          </div>
        );
    }
}

module.exports = warp({
    Target: Article,
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
