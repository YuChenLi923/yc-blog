import eAjax from 'extend-ajax';
import {devHost, serverHost} from '../../config/blog';
console.log(process.env, 11111111111);
const baseConfig = {
  async: true,
  header: {
    'Content-Type': 'application/json',
    'Accept': 'json'
  },
  timeOut: 10000,
  convert: function (result) {
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  },
  host: process.env.HOT_ENV ? devHost : serverHost
};
console.log(process.env);
eAjax.config(baseConfig);
let ajaxStack = [],
    preHref = '';
function ajax(url, method, config) {
  if (!config.header) {
    config.header = {};
  }
  config.header.Authorization = encodeURIComponent(localStorage.getItem('Authorization')) || 'Bearer  ';
  let href = window.location.href,
      Ajax = eAjax(url, method, config);
  if (preHref && href !== preHref) {
    ajaxStack.forEach((item) => {
      item.stop();
    });
    ajaxStack = [];
  } else {
    ajaxStack.push(Ajax);
  }
  preHref = href;
  Ajax.index = ajaxStack.length - 1;
  Ajax.on('end', () => {
    ajaxStack.splice(Ajax.index, 1);
  });
  return Ajax;
}

export default {
  get: function (url, config = {}) {
    return ajax(url, 'get', config);
  },
  post: function (url, config = {}) {
    return ajax(url, 'post', config);
  }
};
