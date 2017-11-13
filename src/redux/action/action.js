import ajax from '../../utils/yc-ajax';
import {devHost, serverHost} from '../../../config/blog';
import assgin from '../../utils/yc-assign';
import {
  LOADING_SERVER_DATA,
  SERVER_TIMEOUT,
  GET_SERVER_MOBILE_DATA,
  SERVER_FAIL,
  GET_SERVER_NO_DATA,
  GET_SERVER_MOBILE_NO_DATA,
  GET_SERVER_DATA,
  GET_SERVER_MOBILE_ALL_DATA
} from '../type/index';
const postSeverData = (ajaxConfig) => {
    return (dispatch) => {
        let header = {},
            {noDispatch, hasToken, onSuccess, url} = ajaxConfig;
        if (!noDispatch) {
            dispatch({
              type: LOADING_SERVER_DATA
            });
        }
        if (hasToken) {
          header = {
            Authorization: encodeURIComponent(global.storage.getItem('Authorization')) || 'Bearer  '
          };
        }
      ajaxConfig.onSuccess = (result, header) => {
        result = JSON.parse(result);
        if (!noDispatch) {
          switch (result.status) {
            case 100:
              dispatch({
                type: GET_SERVER_DATA,
                data: result.data
              });
              break;
            case 101:
              dispatch({
                type: GET_SERVER_MOBILE_DATA,
                data: result.data
              });
              break;
            case 102:
              dispatch({
                type: GET_SERVER_NO_DATA,
                data: result.data
              });
              break;
            case 103:
              dispatch({
                type: GET_SERVER_MOBILE_NO_DATA,
                data: result.data
              });
              break;
            case 104:
              dispatch({
                type: GET_SERVER_MOBILE_ALL_DATA,
                data: result.data
              });
              break;
            default:
              break;
          }
        }
        if (result.status === 200) {
          alert('请重新登录');
          window.location.href = '/login';
        }
          onSuccess && onSuccess(result, header);
      };
      ajaxConfig.url = (process.env.HOT_ENV ? devHost : serverHost) + url;
      ajax(assgin({}, ajaxConfig, {
        header,
        onTimeOut: () => {
          dispatch({
            type: SERVER_TIMEOUT
          });
        },
        onError: () => {
          dispatch({
            type: SERVER_FAIL
          });
        },
        onFail: () => {
          dispatch({
            type: SERVER_FAIL
          });
        }
      }));
    };
};

module.exports = {
    postSeverData
};
