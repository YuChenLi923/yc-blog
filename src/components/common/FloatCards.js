import React, {Component} from 'react';
import warp from './wrapCompontent';
import '../../assets/scss/components/FloatCards.scss';
import {is, fromJS} from 'immutable';

class FloatCards extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
    }
    constructor(props) {
        super(props);
        this._click = this._click.bind(this);
    }
    _click(item) {
        const that = this;
        return function () {
            item.click(item.name, that.props.dispatch);
        };
    }
    _createItem(items, isToSD, isMobile) {
        let i,
            len = items.length,
            result = [];
        for (i = 0; i < len; i++) {
            if ((!items[i].withScroll && ((isMobile && items[i].isMobile) || !isMobile)) || (items[i].withScroll && isToSD)) {
                result.push(
                    <li className={'card ' + 'index' + i}
                        key={i}
                        onClick={this._click(items[i])}
                    >
                        {!items[i].noWarn && !isMobile &&
                            <span className="text">{items[i].name}</span>
                        }

                    </li>
                );
            }
        }
        return result;
    }
    render() {
        let {
            type,
            getClassName,
            prefix,
            className,
            isToSD = false,
            isMobile = false,
            items = []
        } = this.props;
        return (
            <div className={getClassName(prefix + type, className)}>
                <ul >
                    {this._createItem(items, isToSD, isMobile)}
                </ul>
            </div>
        );
    }
}
module.exports = warp({
    Target: FloatCards,
    type: 'float-cards',
    redux: {
        mapStateToProps: (state) => {
            let { scrollDS, deviceChange } = state;
            return {
                isToSD: scrollDS.isToSD,
                isMobile: deviceChange.isMobile
            };
        }
    }
});
