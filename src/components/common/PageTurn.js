/**
 *  name:Nav
 *  version:0.0.1
 *  desc:导航栏组件
 *  API：
 *      horizontal 布尔值,是否为水平导航栏,默认为false
 *      disabled 布尔值，是否禁止导航栏，禁止后，将不会触发回到函数以及改变index,但仍可以通过url跳转
 *      items 数组[[item],[item]]
 *            item: name 字符串，导航栏子级块的名称
 *                  pic 字符串,图片路径
 *                  url 字符串,跳转的链接
 *                  target 字符串,跳转的方式
 *
 *
 **/
import React, {Component} from 'react';
import warp from './wrapCompontent';
import assign from '../../utils/yc-assign';
import '../../assets/scss/components/PageTurn.scss';
import {is, fromJS} from 'immutable';
import { Link } from 'react-router';
class PT_LI extends Component {
    constructor(props) {
        super(props);
        this._create = this._create.bind(this);
    }
    getCurStart(index, showNum, sum) {
        let start = 1;
        if (index > Math.floor(showNum) / 2 &&
            index < sum - Math.floor(showNum / 2 - 1)) {
            start = index - Math.floor(showNum / 2);
        } else if (index <= Math.floor(showNum / 2)) {
            start = 1;
        } else if (index >= sum - Math.floor(showNum / 2 - 1)) {
            start = sum - showNum + 1;
        } else if (index === sum) {
            start = index - showNum + 1 || 1;
        }
       return start;
    }
    _create(showNum, sum, index, url) {
        let i,
            items = [],
            start,
            item,
            query = this.props.query || {};
        start = this.getCurStart(index, showNum, sum);
        for (i = start; i <= showNum + start - 1; i++) {
            item = (<li key={i} className={i === index ? 'cur' : ''}>
                <Link to={{
                  pathname: url,
                  query: assign({}, query, {p: i})
                }}>
                    {i}
                </Link>
            </li>);
            items.push(item);
        }
        return items;
    }
    render() {
        let {showNum, sum, index, url} = this.props;
        return (
            <ul className="warp">
                {this._create(showNum, sum, index, url)}
            </ul>
        );
    }
}
class PT extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    render() {
        let {
            getClassName,
            prefix,
            type,
            className,
            showNum = 5,
            sum = 0,
            index = 1,
            url,
            isMobile,
            query = {}
        } = this.props;
        if (showNum > sum) {
            showNum = sum;
        }
        return (
            <div className={getClassName(prefix + type, className)}>
                {sum > 1 && !isMobile &&
                    <div className="container">
                        {index > 1 &&
                        <span className="btn last">
                          <Link to={{
                            pathname: url,
                            query: assign(query, {p: index - 1})}}
                          />
                        </span>}
                        <PT_LI query={query}
                               sum={sum}
                               showNum={showNum}
                               index={index}
                               url={url}
                        />
                        {index < sum &&
                        <span className="btn next">
                          <Link to={{
                            pathname: url,
                            query: assign(query, {p: index + 1}
                            )}}
                          /></span>}
                    </div>
                }
            </div>
        );
    }
}
PT.defaultProps = {
    horizontal: false,
    disabled: false
};
module.exports = warp({
    Target: PT,
    type: 'pt',
    redux: {
        mapStateToProps: (state) => {
            let { deviceChange } = state;
            return {
                isMobile: deviceChange.isMobile
            };
        }
    }
});
