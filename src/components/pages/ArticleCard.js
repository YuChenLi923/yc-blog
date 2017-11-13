import React, {Component} from 'react';
import { Link } from 'react-router';
import '../../assets/scss/components/ArticleCard.scss';
import {is, fromJS} from 'immutable';
class ArticleCard extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    render() {
        let { title, time, type, description, id } = this.props;
        return (
          <Link to = {{
            pathname: 'article',
            query: {id}
          }}>
            <div className = "articleCard">
                <h className = "title" title={ title }>{title}</h>
                <p className="subtitle" >
                    <span className="time">{'时间:' + time}</span>
                    <span className="type">{'类别:' + type}</span>
                </p>
                <p className="desc">
                    {description}
                </p>
            </div>
          </Link>
        );
    }
}
module.exports = ArticleCard;
