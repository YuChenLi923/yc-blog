/**
 * 节流器，减少执行代码次数，优化性能
 *
 * @param    { function}  func   执行函数
 * @param    { number }  rate 执行效率
 * @returns  { function } func的节流版本
 *
 * @author      YuChenLi923<liyc_code@163.com>
 */

function createRestrictor(func, rate) {
    let i = 0;
    return function () {
      ++i;
      if (i % rate === 0) {
        let result = func();
        if (typeof result === 'function') {
          func = result;
        }
      }
    };
}
module.exports = createRestrictor;
