import React,{Component} from 'react';
import warp from './wrapCompontent';
import '../../assets/scss/components/MaskLayer.scss';
import { is, fromJS} from 'immutable';

class MaskLayer extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    render(){
        let {
            getClassName,
            prefix,
            type,
            className,
            open = false
        } = this.props;
        return(
            <div>
                {open&&
                    <div className={getClassName(prefix + type, className)}>{this.props.children}</div>
                }
            </div>
        )
    }
}
module.exports = warp({
    Target:MaskLayer,
    type:'mask-layer'
});