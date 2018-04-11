import React, {Component} from 'react';
import warp from '../../components/common/wrapCompontent';
import {postSeverData} from '../../redux/action/action';
class ResourceAdmin extends Component {
  render() {
    return (
      <div>
        资源管理正在开发中....
      </div>
    );
  }
}
module.exports = warp({
  Target: ResourceAdmin,
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

