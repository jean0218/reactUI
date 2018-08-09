/*---------------------------------------------------------
@ 创建时间：20170915
@ 创 建 者：lunjiao.peng
@ 功能描述：距离计算
---------------------------------------------------------*/

//数字+米 || 千米
//* @param  {[type]} date
//* @return {[type]} string 

export function calculationMeter(str) {
  if (str == undefined) {
    return '未知';
  }
  if(str < 1000){
    return str + 'm';
  }
  return (str / 1000).toFixed(1) + 'km';
}