import React, {Component} from 'react';
import warp from '../components/common/wrapCompontent';
import {postSeverData} from '../redux/action/action';
class Reprint extends Component {
  render() {
    return (
      <div>
        订阅正在开发中....
      </div>
    );
  }
}
module.exports = warp({
  Target: Reprint,
  redux: {
    mapDispatchToProps: {postSeverData},
    mapStateToProps: (state) => {
      let {getServerData} = state;
      return {
        data: getServerData.data
      };
    }
  }
});

