import eAjax from '../../utils/yc-ajax';
import {
  LOADING_SERVER_DATA,
  SERVER_TIMEOUT,
  SERVER_FAIL,
  GET_SERVER_NO_DATA,
  GET_SERVER_MOBILE_NO_DATA,
  GET_SERVER_DATA,
  GET_SERVER_MOBILE_DATA,
  GET_SERVER_MOBILE_ALL_DATA,
  GET_ARTICLE_LIST_DATA
} from '../type/index';
module.exports = function ({page, type, num, isMobile, date}) {
  return (dispatch, getState) => {
    let ajax = eAjax.get('yc/getArticleList', {
      query: {
        page,
        num,
        type,
        isMobile,
        date
      }
    });
    ajax.on('success', (result) => {
      let {data: {data, status}} = result;
      switch (status) {
        case 100:
          dispatch({
            type: GET_ARTICLE_LIST_DATA,
            data: data
          });
          dispatch({type: GET_SERVER_DATA});
          break;
        case 101:
          let articleListData = getState().articleListData.data || {list: [], page: 0};
          data.list = articleListData.list.concat(data.list);
          dispatch({
            type: GET_ARTICLE_LIST_DATA,
            data: data
          });
          dispatch({type: GET_SERVER_MOBILE_DATA});
          break;
        case 102:
        case 103:
          dispatch({
            type: GET_SERVER_NO_DATA
          });
          break;
        case 104:
          dispatch({
            type: GET_SERVER_MOBILE_ALL_DATA
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
