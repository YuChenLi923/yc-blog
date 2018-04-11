import eAjax from '../../utils/yc-ajax';
import {
    GET_SERVER_NO_DATA,
    GET_SERVER_DATA,
    SERVER_TIMEOUT,
    SERVER_FAIL,
    LOADING_SERVER_DATA,
    GET_ARTICLE_DATA
} from '../type/index';

module.exports = function (id) {
    return (dispatch) => {
        let ajax = eAjax.get('yc/getArticleText', {
            query: {
                id
            }
        });
        ajax.on('success', (result) => {
            let {data: {data, status}} = result;
            switch (status) {
                case 100:
                  dispatch({
                    type: GET_ARTICLE_DATA,
                    data
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
