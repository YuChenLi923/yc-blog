import React, { Component } from 'react';
import classnames from 'classnames';
import {is, fromJS} from 'immutable';
import {connect} from 'react-redux';
const prefix = 'yc-ui-';

/**
 * 用于包装组件
 *
 * @param    {object} Target 被包装的组件
 * @param    {object} type   被包装的组件的类型
 * @returns  {object} redux  包装组件redux,如果存在则与redux连接
 *
 * @author      YuChenLi923<liyc_code@163.com>
 */
function warpComponent({Target, type, redux}) { //
    class WarpComponent extends Component {
        shouldComponentUpdate(nextProps, nextState) {
            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
        }
        render() {
            return (
                <Target {...this.props}/>
            );
        }
    }
    WarpComponent.defaultProps = {
        prefix: prefix,
        type: type,
        getClassName: classnames
    };
    return redux ? connect(redux.mapStateToProps || null, redux.mapDispatchToProps || null)(WarpComponent) : WarpComponent;
}
module.exports = warpComponent;
