/**
 * 判断对象是否含有某属性
 * @param  {[type]}  object [description]
 * @param  {[type]}  name   [description]
 * @return {Boolean}        [description]
 */
export function hasPrototype(object, name) {
  return object.hasOwnProperty(name) && (name in object);
}

/**
 * 筛选参数，当参数为null或者undeifind时，去掉该参数
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export function removeNull(obj) {
  for (var i in obj) {
    if (obj[i] === undefined || obj[i] === null || obj[i] === '') {
      delete obj[i];
    }
  }
  return obj;
}


/**
 * 判断两对象是否相等
 * @param  {[type]}  x [description]
 * @param  {[type]}  y [description]
 * @return {Boolean}   [description]
 */
export function isEqual(x, y) {
    var in1 = x instanceof Object;
    var in2 = y instanceof Object;
    if (!in1 || !in2) {
        return x === y;
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
    }
    for (var p in x) {
        var a = x[p] instanceof Object;
        var b = y[p] instanceof Object;
        if (a && b) {
            return equals(x[p], y[p]);
        } else if (x[p] !== y[p]) {
            return false;
        }
    }
    return true;
}

function equals(str1, str2) {
    if (str1 == str2) {
        return true;
    }
    return false;
}

//返回的是对象形式的参数  
export function getUrlArgObject() {
  var args = new Object();
  var query = location.search.substring(1); //获取查询串  
  let hashString = '';
  if(query.length == 0){//当为路由时处理
    hashString = location.hash;
    query = hashString.slice(hashString.indexOf('?') + 1);
  }
  var pairs = query.split("&"); //在逗号处断开  
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('='); //查找name=value  
    if (pos == -1) { //如果没有找到就跳过  
      continue;
    }
    var argname = pairs[i].substring(0, pos); //提取name  
    var value = pairs[i].substring(pos + 1); //提取value      
    args[argname] = decodeURIComponent(value); //存为属性  
  }
  return args; //返回对象  
}