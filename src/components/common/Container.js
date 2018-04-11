import React, {Component} from 'react';
import warp from './wrapCompontent';
class Container extends Component {
    render() {
         let {id} = this.props;
        return (
            <div className={'container'} id={id}>
              <div className={'container-content'}>
                {this.props.children}
              </div>
            </div>
        );
    }
}
module.exports = warp({
    Target: Container,
    type: 'container'
});
