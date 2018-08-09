/*---------------------------------------------------------
@ 创建时间：20170913
@ 创 建 者：lunjiao.peng
@ 功能描述：处理时间的的各类函数
---------------------------------------------------------*/

//时间转字符串
//* @param  {[type]} date
//* @return {[type]} string 
export function timeToString(date){
    const dateString = timeArrayToString( timeToArray(new Date(date) ) );
    return dateString;
}

//字符转时间数组
//* @param  {[type]} date
//* @return {[type]} array 
export function timeStringToArray(str) {
    var chooseTime = [];
    chooseTime['y'] = str.substring(0, 4);
    chooseTime['m'] = str.substring(5, 7);
    return chooseTime;
}

//时间数组转字符
//* @param  {[type]} str
//* @return {[type]} array   
export function timeArrayToString(str) {
    var chooseTime = str;
    var times = chooseTime['y'] + '-' + fillzero(chooseTime['m']) + '-' + fillzero(chooseTime['d']);
    return times;
}

//定义一个包含十二个月在内的月份总天数的数组
//* @param  {[type]} array 
//* @return {[type]} array   
export function dayArray(date) {
    const dayArray = new Array(31, 28 + isLeap(date.y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
    return dayArray;
}

//判断润年
export function isLeap(year) {
    var res = year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0);
    return res;
}

//字符转时间戳
//* @param  {[type]} str 
//* @return {[type]} num    
export function timeStringToStamp(time) {
    var date = time.substring(0, 19);
    date = date.replace(/-/g, '/');
    console.log('new Date(date)',time , new Date(date))
    var timestamp = new Date(date).getTime();
    return timestamp;
}

//时间转数组
//* @param  {[type]} str 
//* @return {[type]} array     
export function timeToArray(str) {
    var chooseTime = [];
    chooseTime['y'] = str.getFullYear();
    chooseTime['m'] = fillzero(str.getMonth() + 1);
    chooseTime['d'] = fillzero(str.getDate());
    chooseTime['h'] = fillzero(str.getHours());
    chooseTime['i'] = fillzero(str.getMinutes());
    chooseTime['s'] = fillzero(str.getSeconds());
    chooseTime['w'] = str.getDay(); //周几
    return chooseTime;
}

/**
 * 如果日期为一位数，则在前面补零
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function fillzero(str) {
    var str = typeof str == "string" ? str : str.toString();
    if (str.length == 1) {
        str = "0" + str;
    }
    return str;
}
/**
 * 比较时间相差的天数
 * @param  {[type]} startDate [description]
 * @param  {[type]} endDate   [description]
 * @return {[type]}           [description]
 */
function compareTime(startDate, endDate) {
  let starttime = new Date(startDate);
  let endtime = new Date(endDate);
  let day = parseInt((starttime - endtime) / 86400000);
  if (day >= 0 && day <= 2) {
    return {
      result: true,
      day: day
    };
  }
  return {
    result: false,
    day: day
  };;
}