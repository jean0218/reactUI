/*---------------------------------------------------------
@ 创建时间：20171016
@ 创 建 者：lunjiao.peng
@ 参数
    len type:number 生成的长度
    radix type:number 几进度的，如2进制，10制，16进制等
@ 功能描述：全局唯一标识
            GUID是一种由算法生成的二进制长度为128位的数字标识符。
            GUID 的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，
            其中的 x 是 0-9 或 a-f 范围内的一个32位十六进制数。
            在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
---------------------------------------------------------*/

export default function generateUuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};