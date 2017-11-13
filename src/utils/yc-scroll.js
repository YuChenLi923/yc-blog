
function getScrollBottomDis() {
    let docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight),
        viewHeight = Math.min(document.documentElement.scrollHeight, document.documentElement.clientHeight),
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
return docHeight - viewHeight - scrollTop;
}

function getScrollTopDis() {
  return document.body.scrollTop;
}
module.exports = {
    getScrollBottomDis,
    getScrollTopDis
};
