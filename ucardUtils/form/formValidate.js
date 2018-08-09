import { trim } from 'ucardUtils';
import inputValidate from './inputValidate';


export default function formValidate(id) {
    if (id === undefined) {
        formError('noId');
        return false;
    }
    var validate = true,
        itemValidate = true,
        formlist = {},
        rule;
    var idObj = document.getElementById(id);
    if (idObj === null) {
        formError('noId');
        return false;
    }
    var inputList = idObj.getElementsByTagName('input');
    //过滤掉属性为readonly的
    var inputlist = [],
        readonly = "";
    for (var j = 0; j < inputList.length; j++) {
        readonly = inputList[j].getAttribute('readOnly');
        if ((readonly === null || readonly === 'null') && inputList[j].type !== 'hidden' && inputList[j].type !== "radio") {
            inputlist.push(inputList[j]);
        }
    }
    if (inputlist !== null && inputlist !== "" && inputlist !== undefined) {
        for (var i = 0; i < inputlist.length; i++) {
            rule = inputlist[i].getAttribute('data-rule');
            if (rule !== '' || rule !== undefined) {
                itemValidate = inputValidate(rule, inputlist[i].value);
            }
            if (!itemValidate.validate) {
                inputlist[i].parentNode.getElementsByTagName("p")[0].innerHTML = '<i class="iconfont">&#xe6b6;</i>' + itemValidate.message;
            } else {
                formlist[inputlist[i].name] = trim(inputlist[i].value);
            }
            validate = validate && itemValidate.validate;
        }
        if (validate) {
            return formlist;
        } else {
            return {};
        }
    } else {
        return {};
    }
}

function formError(str) {
    switch (str) {
        case 'noId':
            console.log('Form标签的id不能为空');
            break;
        case 'noRule':
            console.log('Input标签的效验规则rule属性不能为空');
            break;
    }
}