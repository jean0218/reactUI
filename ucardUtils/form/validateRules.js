//校验的正则表达式及校验的提示字符
const validateRules = {
    "rule": {
        name: "[\x00-\xff]{6,32}$",
        text: "[\u4e00-\u9fa5]$",
        idname: "^[a-zA-Z]{1}([0-9a-zA-Z_-]){5,19}$",
        email: "^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
        number: "^\\-?\\d+(\\.\\d+)?$",
        url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
        tel: "^1\\d{10}$",
        validatedode: "^\\d{4}$",
        password: '^.{6,20}$',
        zipcode: "^\\d{6}$",
        date: "^\\d{4}\\-(0\\d|1[0-2])\\-([0-2]\\d|3[0-1])$",
        time: "^[0-2]\\d\\:[0-5]\\d$",
        hour: "^[0-2]\\d\\:00$",
        minute: "^[0-2]\\d\\:[0-5]\\d$",
        "date-range": "^\\d{4}(\\-\\d{2}){2}\\s至\\s\\d{4}(\\-\\d{2}){2}$",
        "month-range": "^\\d{4}\\-\\d{2}\\s至\\s\\d{4}\\-\\d{2}$",
        isNotNull: '\\S',
        idCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        bankCard: /^(\d{16}|\d{19})$/,
        merchantCode: "^\\d{15}$",
        paypassword: "^\\d$",
        invitationcode:"^\\d{6}$",
        amount:"^\\-?\\d+(\\.\\d{2})?$",//金额，带负数，最多保留小数点后两位
        realName:"[\u4e00-\u9fa5]$",
        bizRange:"\\S",
        position:"\\S",
        applyLoanAmt:"\\S",
        selectCity:"\\S",
        none:""
    },
    "message": {
        name: "请输入正确的名称",
        text: "请输入中文字符",
        idname: "ID",
        email: "邮箱",
        number: "数值",
        url: "网址",
        tel: "请输入正确的手机号码",
        validatedode: '验证码必须为4位数字',
        password: "密码必须是6-20位数字、字母或符号",
        zipcode: "邮编",     
        date: "日期",
        year: "年份",
        month: "月份",
        hour: "小时",
        minute: "分钟",
        time: "时间",
        datetime: "日期时间",
        "date-range": "日期范围",
        "month-range": "月份范围",
        isNotNull: "不能为空",
        idCard: "请输入正确的身份证号码",
        bankCard: "请输入正确的银行卡号",
        merchantCode: '商户号必须为15位数字',
        invitationcode: '邀请码必须为4位数字',
        amount:"金额必须为数字(可以包含小数点后两位)",
        realName:"请输入真实姓名",
        bizRange:"请输入经营名称",
        position:"请选择职务",
        applyLoanAmt:"请选择申请额度",
        selectCity:"请选择城市",
        none:"",
    },
    "other": {
        ignore: {
            radio: "请选择一个选项",
            checkbox: "如果要继续，请选中此框",
            select: "请选择列表中的一项",
            "select-one": "请选择列表中的一项",
            empty: "请填写此字段"
        },
        unmatch: {
            pattern: "内容格式不符合要求",
            multiple: "某项内容格式不符合要求"
        },
        out: {
            min: "值偏小",
            max: "值偏大",
        },
        overflow: {
            minlength: "内容长度偏小",
            maxlength: "内容长度偏大"
        }
    }
}


export {
    validateRules
};