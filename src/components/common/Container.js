import React, {Component} from 'react';
import warp from './wrapCompontent';
class Container extends Component {
    render() {
        return (
            <div className={'container'}>
                {this.props.children}
            </div>
        );
    }
}
module.exports = warp({
    Target: Container,
    type: 'container'
});
