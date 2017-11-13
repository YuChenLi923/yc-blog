const doc = document,
      win = window,
      docEl = doc.documentElement,
      metaEl = doc.querySelector('meta[name="viewport"]');
let scale = 1,
    dpr = 1;

// 设置当前的rem
function setCurRem() {
    let width = docEl.getBoundingClientRect().width,
        devicePixelRatio = win.devicePixelRatio,
        rem;
    if (devicePixelRatio) {
        if (devicePixelRatio >= 3) {
            dpr = 3;
        } else if (devicePixelRatio >= 2) {
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        dpr = 1;
    }

    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    scale = parseFloat((1 / dpr).toFixed(2));
    docEl.setAttribute('data-dpr', dpr);
    metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
};

// 获取屏幕宽度
function getScreenSizeW() {
    let width = docEl.getBoundingClientRect().width;
    return Math.ceil(width * scale);
}
// 获取屏幕高度
function getScreenSizeH() {
    let height = docEl.clientHeight;
    return Math.ceil(height * scale);
}

// 判断是否是移动端
function isMobile() {
    return getScreenSizeW() <= 768;
}
function getScrollBottomDis() {
  let docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight),
    viewHeight = Math.min(document.documentElement.scrollHeight, document.documentElement.clientHeight),
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  return (docHeight - viewHeight - scrollTop) / dpr;
}

function getScrollTopDis() {
  return (document.documentElement.scrollTop || document.body.scrollTop) / dpr;
}
module.exports = {
    setCurRem,
    getScreenSizeW,
    getScreenSizeH,
    isMobile,
    getScrollBottomDis,
    getScrollTopDis
};
