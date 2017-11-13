/**
 *  name:Nav
 *  version:0.0.1
 *  desc:卡片包裹器，模版包裹器
 *
 *
 **/
import React, {Component} from 'react';
import warp from './wrapCompontent';
import '../../assets/scss/components/CardWarper.scss';
class CardWarper extends Component {
    _create(Template, datas = []) {
        let i,
            len = datas.length,
            result = [],
            data;
        for (i = 0; i < len; i++) {
            data = datas[i];
            result.push(
                <Template {...data} key={i} parent={this.props.parent || this}/>
            );
        }
        return result;
    }
    render() {
        let { prefix, className = '', template, data, type, getClassName } = this.props;
        return (
            <div className={getClassName(prefix + type, className)}>
                {this._create(template, data)}
            </div>
        );
    }
}

module.exports = warp({
    Target: CardWarper,
    type: 'cardWaper'
});
