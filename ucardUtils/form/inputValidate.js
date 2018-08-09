import inputValidateArr from './inputValidateArr';
import { trim } from 'ucardUtils';


export default function inputValidate(text, value) {
    var textArr = new Array;
    if (text === null || text === undefined || $.trim(text) === "") {
        return false;
    }
    // console.log("text:",text);
    if (text.indexOf('&') > 0) { //判断校验规则是一个还是多个
        textArr = text.split('&'); //拆分校验规则                
    } else {
        textArr[0] = text;
    }
    return inputValidateArr(textArr, value);
}