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
import '../../assets/scss/components/Nav.scss';
import {is, fromJS} from 'immutable';
class Nav extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    constructor(props) {
        super(props);
        this.state = {
            curIndex: this.props.index !== undefined ? this.props.index : 0
        };
        this._click = this._click.bind(this);
    }
    _click(item, index) {
        let that = this,
            { click } = this.props;
        return function () {
            if (click) {
              click(item, index);
            }
            that.setState({
                curIndex: index
            });
        };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.index !== this.state.curIndex) {
        this.setState({
          curIndex: nextProps.index
        });
      }
    }
    _createNavItem(items) {
        let result = [],
            { getClassName, disabled } = this.props,
            { curIndex } = this.state;
        items.forEach((item, index) => {
            result.push(
                <li key={index}
                    className={getClassName(
                      'index-' + (index + 1),
                      {selected: (index === curIndex) && !disabled})}>
                {do {
                    if (item.url) {
                        <a href={item.url} target={item.target || '_self'}>
                            {item.pic && <img src={item.pic}/>}
                            {item.value || item}
                        </a>;
                    } else if (!disabled) {
                        <a onClick={this._click(item, index)}>
                            {item.pic && <img src={item.pic}/>}
                            {item.value || item}
                        </a>;
                    } else {
                        <a>
                            {item.pic && <img src={item.pic}/>}
                            {item.value || item}
                        </a>;
                    }
                }}
            </li>);
        });
        return result;
    }
    render() {
        let {
            type,
            getClassName,
            prefix,
            horizontal,
            className = '',
            items = []
        } = this.props;
        return (
           <div className={getClassName(prefix + type, className)}>
               <ul className={getClassName({horizontal}, {normal: !horizontal})}>
                    {this._createNavItem(items)}
                </ul>
           </div>
        );
    }
}
Nav.defaultProps = {
    horizontal: false,
    disabled: false
};
module.exports = warp({
    Target: Nav,
    type: 'nav'
});
