import { trim } from 'ucardUtils';
import inputValidate from './inputValidate';


export default function formValidate(id) {
    if (id === undefined) {
        return "";
    }

    var idObj = document.getElementById(id);
    if (idObj === null) {
        return "";
    }
    var validate = true,
        itemValidate = true,
        inputList = idObj.getElementsByTagName('input'),
        obj = {
            errorMsg: "",
            formlist: {}
        };

    //过滤掉属性为readonly的
    var inputlist = [],
        readonly = "";
    for (var j = 0; j < inputList.length; j++) {
        readonly = inputList[j].getAttribute('readOnly');
        if ((readonly === null || readonly === 'null') && inputList[j].type !== 'hidden') {
            // inputlist.push(inputList[j]);
            let item = inputList[j];

            let rule = item.getAttribute('data-rule');

            if (rule !== '' || rule !== undefined) {
                let itemValidate = inputValidate(rule, item.value);

                if (!itemValidate.validate) {
                    obj.errorMsg = itemValidate.message;
                    return obj;
                } else {
                    obj.formlist[item.name] = trim(item.value);
                }
            }
        }
    }
    return obj;
};

