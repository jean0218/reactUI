/*---------------------------------------------------------
@ 创建时间：20170915
@ 创 建 者：lunjiao.peng
@ 功能描述：判断对象2中是否有对象1中的字段名，如果有值存在，则更改对象1
---------------------------------------------------------*/
export default function setValue(obj1, obj2) {
    for (let name in obj2) {
        if (obj2[name]) {
            obj1[name] = obj2[name];
        }
    }
    return obj1;
};