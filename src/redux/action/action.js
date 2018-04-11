import {
  CLEAN_SERVER_DATA
} from '../type/index';
import getHomeData from './getHomeData';
import getArticeDataAdmin from './getArticeDataAdmin';
import getArticleList from './getArticleList';
import getArticleData from './getArticleData';
import touchMenuSwitch from './touchMenuSwitch';
import getSearchResult from './getSearchResult';
const cleartGetData = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_SERVER_DATA
    });
  };
};
module.exports = {
  cleartGetData,
  getHomeData,
  getArticeDataAdmin,
  getArticleList,
  touchMenuSwitch,
  getArticleData,
  getSearchResult
};
