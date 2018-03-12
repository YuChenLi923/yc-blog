import ajax from '../libs/ajaxExpand';
import assign from '../utils/yc-assign';
const baseConfig = {
  type: 'post',
  async: true,
  contentType: 'json',
  charset: 'utf-8',
  timeOut: 10000,
  dataType: 'json'
};
let ajaxStack = [],
    preHref = '';
function ajaxManager(ajaxConfig) {
  let Ajax = ajax.init(assign({}, baseConfig, ajaxConfig)),
        href = window.location.href;
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
  Ajax.onEnd = function () {
    ajaxStack.splice(Ajax.index, 1);
  };
  Ajax.send();
}

export default ajaxManager;
