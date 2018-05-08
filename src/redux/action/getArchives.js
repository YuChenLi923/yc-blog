import eAjax from '../../utils/yc-ajax';
import {
  LOADING_SERVER_DATA,
  SERVER_TIMEOUT,
  SERVER_FAIL,
  GET_SERVER_NO_DATA,
  GET_SERVER_DATA
} from '../type/index';
module.exports = function (reactVM) {
  return (dispatch) => {
    let ajax = eAjax.get('yc/getArchives');
    ajax.on('success', (result) => {
      let {data: {date, status}} = result;
      switch (status) {
        case 100:
          reactVM.setState({
            archives: date
          });
          dispatch({type: GET_SERVER_DATA});
          break;
        case 102:
        case 103:
          dispatch({
            type: GET_SERVER_NO_DATA
          });
          break;
        default:
          break;
      }
    });
    ajax.on('start', function () {
      dispatch({
        type: LOADING_SERVER_DATA
      });
    });
    ajax.on('timeout', function () {
      dispatch({
        type: SERVER_TIMEOUT
      });
    });
    ajax.on('fail', function () {
      dispatch({
        type: SERVER_FAIL
      });
    });
    ajax.send();
  };
};
