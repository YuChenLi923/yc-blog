/**
 * Created by swull on 2017/7/24.
 */
import {
    SCROLL_TO_SD,
    SCROLL_LEAVE_SD,
    SCROLL_TO_DROP,
    MOBILE_DEVICE,
    DESKTOP_DEVICE,
    GET_SERVER_DATA,
    LOADING_SERVER_DATA,
    SERVER_FAIL,
    SERVER_TIMEOUT,
    GET_SERVER_NO_DATA,
    GET_SERVER_MOBILE_DATA,
    GET_SERVER_MOBILE_ALL_DATA,
    MENU_OPEN,
    MENU_CLOSE,
    CLEAN_SERVER_DATA,
    GET_ARTICLE_DATA,
    GET_ARTICLE_LIST_DATA
} from '../type';
import assign from '../../utils/yc-assign';
import {isMobile} from '../../utils/yc-mobile';
function scrollDS(state = { dropTimes: 0 }, action = {}) {
    switch (action.type) {
        case SCROLL_TO_DROP:
            return assign({}, state, {
                dropTimes: action.times
            });
        case SCROLL_TO_SD: // 滚动指定距离
            return assign({}, state, {
                isToSD: true
            });
        case SCROLL_LEAVE_SD: // 离开指定距离
            return assign({}, state, {
                isToSD: false
            });
        default:
            return state;
    }
}

function deviceChange(state = { isMobile: isMobile() }, action = {}) {
    switch (action.type) {
      case MOBILE_DEVICE:
        return assign({}, state, {
          isMobile: true
        });
      case DESKTOP_DEVICE:
        return assign({}, state, {
          isMobile: false
        });
      default:
        return state;
    }
}

// loading状态

function loadStatus(state = {}, action = {}) {
  switch (action.type) {
    case GET_SERVER_MOBILE_ALL_DATA:
      return assign({}, state, {
        remind: '已经拉到最下面啦',
        icon: 'get-all-data'
      });
    case GET_SERVER_NO_DATA:
      return assign({}, state, {
        remind: '不存在相关数据',
        icon: 'no-data'
      });
    case GET_SERVER_MOBILE_DATA:
    case GET_SERVER_DATA:
      return assign({}, state, {
        remind: '',
        icon: ''
      });
    case LOADING_SERVER_DATA:
      return assign({}, state, {
        remind: '正在加载...',
        icon: 'loading'
      });
    case SERVER_FAIL:
      return assign({}, state, {
        remind: '服务器发生错误',
        icon: 'server-error'
      });
    case SERVER_TIMEOUT:
      return assign({}, state, {
        remind: '宇宸的垃圾服务器太忙啦- -',
        icon: 'timeout'
      });
    default:
      return state;
  }
}

// 文章列表的数据
function articleListData(state = {}, action = {}) {
 switch (action.type) {
   case CLEAN_SERVER_DATA:
      return assign({}, state, {
        data: undefined
      });
   case GET_ARTICLE_LIST_DATA:
     return assign({}, state, {
       data: action.data
     });
   default:
     return state;
 }
}
// 文章内容数据
function articleData(state = {}, action = {}) {
  switch (action.type) {
    case GET_ARTICLE_DATA:
      return assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
function menuSwitch(state = {open: false}, action) {
  switch (action.type) {
    case MENU_OPEN:
      return assign({}, state, {
        open: true
      });
    case MENU_CLOSE:
      return assign({}, state, {
        open: false
      });
    default:
      return state;
  }
}
module.exports = {
    scrollDS,
    deviceChange,
    loadStatus,
    menuSwitch,
    articleListData,
    articleData
};
