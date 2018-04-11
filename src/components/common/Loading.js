import React, {Component} from 'react';
import warp from './wrapCompontent';
import '../../assets/scss/components/Loding.scss';
import {is, fromJS} from 'immutable';

class Loading extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    render() {
        let {
            type,
            getClassName,
            prefix,
            className,
            remind,
            icon,
            isMobile,
            mobileLoading = false
        } = this.props;
        return (
            <div className={getClassName(prefix + type, className)}>
                { (remind === '' || (isMobile && mobileLoading)) && this.props.children }
                { remind !== '' &&
                    <div className="remind">
                        <div className={'icon ' + icon}/>
                        <p>{remind}</p>
                    </div>
                }
            </div>
        );
    }
}
module.exports = warp({
    Target: Loading,
    type: 'loading',
    redux: {
        mapStateToProps: (state) => {
            let { loadStatus, deviceChange } = state;
            return {
                remind: loadStatus.remind,
                icon: loadStatus.icon,
                isMobile: deviceChange.isMobile
            };
        }
    }
});
