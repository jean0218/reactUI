import { validateRules } from 'ucardUtils';


export default function inputValidateArr(arr, value) {
    var textReg, validate = true,
        msg = '',
        validateItem = true;
    for (var i = 0; i < arr.length; i++) {
        textReg = new RegExp(validateRules.rule[arr[i]]);
        validateItem = textReg.test(value);
        msg = validateItem ? '' : validateRules.message[arr[i]];
        validate = validate && validateItem;
    }
    return {
        validate: validate,
        message: msg
    }
};