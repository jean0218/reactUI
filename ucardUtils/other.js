/**
 * 格式化手机号码
 * [toThousands description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
export function toThousands(num) {
  var num = (num || 0).toString(), result = '';
  while (num.length > 4) {
    result = ' ' + num.slice(-4) + result;
    num = num.slice(0, num.length - 4);
  }
  if (num) { result = num + result; }
  return result;
}


/**
 * 去左右空格;
 * @param  {[type]} s [description]
 * @return {[type]}   [description]
 */
export function trim(s) {
  if (s == undefined || s == '') {
    return '';
  } else {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }

}