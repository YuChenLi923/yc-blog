import {setCurRem, isMobile, getScrollTopDis, getScrollBottomDis} from '../utils/yc-mobile';
import createRestrictor from '../utils/yc-restrictor';
module.exports = function (store) {
   setCurRem();
    // 定义常量
    const win = window;
    let MOBILE;
    global.storage = window.localStorage;
    // 全局检测设备变化，设置相应的rem,并且通知部分组件设备发生了变化
    function globalLisenerEvent() {
        setCurRem();
        if (MOBILE !== isMobile()) {
            MOBILE = isMobile();
            if (MOBILE) {
                store.dispatch({type: 'MOBILE_DEVICE'});
            } else {
                store.dispatch({type: 'DESKTOP_DEVICE'});
            }
        }
        let curTopDis = getScrollTopDis();
        if (curTopDis > 200) {
            store.dispatch({
                type: 'SCROLL_TO_SD'
            });
        } else if (curTopDis <= 200) {
            store.dispatch({
                type: 'SCROLL_LEAVE_SD'
            });
        }
    }
    // 全局检测距离页面顶部的距离,并分发事件
    const windowScrollLisenerEvent = createRestrictor(function () {
        let preTopDis = getScrollTopDis(),
            preBottomDis = getScrollBottomDis(),
            dropScrollTimes = 0;
        return function () {
            let curTopDis = getScrollTopDis(),
                bottomDis = getScrollBottomDis();
            console.log(bottomDis, preBottomDis, bottomDis < 100 && preBottomDis >= 100);
            if (bottomDis < 50 && preBottomDis >= 50 && isMobile()) {
                store.dispatch({
                    type: 'SCROLL_TO_DROP',
                    times: ++dropScrollTimes
                });
            }
            if (curTopDis > 200 && preTopDis <= 200) {
                store.dispatch({
                    type: 'SCROLL_TO_SD'
                });
            } else if (curTopDis <= 200 && preTopDis > 200) {
                store.dispatch({
                    type: 'SCROLL_LEAVE_SD'
                });
            }
            preBottomDis = bottomDis;
            preTopDis = curTopDis;
        };
    }, 4);

    // 在移动端时监测导航关闭和开启
    const menuOpenLisenerEvent = function (e) {
      const target = e.target,
          className = target.className;
      console.log(className.indexOf('menu-switch-close') > -1, className, className === 'menu-switch', (className.indexOf('menu-switch-close') > -1) || className !== 'menu' || className === 'menu-switch');
      if ((className.indexOf('menu-switch-close') > -1) || className !== 'menu' || className === 'menu-switch') {
        store.dispatch({
          type: 'MENU_CLOSE'
        });
      }
    };
    // 去除热替换后之前的事件处理程序
    if (process.env.HOT_ENV && module.hot) {
        win.removeEventListener('load', globalLisenerEvent, false);
        win.removeEventListener('resize', globalLisenerEvent, false);
        win.removeEventListener('scroll', windowScrollLisenerEvent, false);
        win.removeEventListener('touchmove', windowScrollLisenerEvent, false);
    }
    win.addEventListener('load', globalLisenerEvent, false);
    win.addEventListener('resize', globalLisenerEvent, false);
    win.addEventListener('scroll', windowScrollLisenerEvent, false);
    win.addEventListener('touchmove', windowScrollLisenerEvent, false);
};
