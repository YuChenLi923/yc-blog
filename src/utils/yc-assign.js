/**
 * 部分模拟ES6中的Object.assign()方法,修复在部分手机上比较老的游览器不支持Object.assign
 *
 * @param   only {object}     目标对象
 * @param   any {object}      源对象
 * @returns  {object}
 *
 * @author      YuChenLi923<liyc_code@163.com>
 */
import isPlainObject from './yc-is-plain-object';
function assign(...args) {
    let target = args.shift(),
        sourceObjs = args,
        len = sourceObjs.length,
        deep = args[args.length - 1],
        i,
        key,
        clone,
        source;
    if (typeof target !== 'object') {
        throw new Error('the target is not Object');
    }
    if (deep === true || typeof deep === 'function') {
      --len;
      sourceObjs.pop();
    }
    for (i = 0; i < len; i++) {
      source = sourceObjs[i];
      for (key in source) {
          if ((deep === true || (typeof deep === 'function' && deep(key, source[key]))) && typeof source[key] === 'object' &&
            Object.prototype.toString.call(source[key]) !== '[object RegExp]') {
            if (Array.isArray(source[key])) {
              clone = target[key] && Array.isArray(target[key]) ? target[key] : [];
            } else {
              clone = target[key] && isPlainObject(target[key]) ? target[key] : {};
            }
            target[key] = assign(clone, source[key], deep);
          } else if (source[key] !== undefined) {
            target[key] = source[key];
          }
      }
    }
    return target;
}
export default assign;
