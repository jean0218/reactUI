/*---------------------------------------------------------
@ 创建时间：20171101
@ 创 建 者：lunjiao.peng
@ 功能描述：工具
---------------------------------------------------------*/

import { EventUtil } from './eventUtil';
import { ENVIRONMENT } from './consts/environment';
import { 
    isWeixinBrowser, 
    isAlipayBrowser, 
    isAppClient, 
    isAndroidClient, 
    isIOSClient 
} from './supportENV/platform';

import { calculationMeter } from './distance';
import setValue from './setValue';
import generateUuid from './generateUuid';

import { supportENV } from './supportENV/supportENV';
import { 
    hasPrototype, 
    isEqual, 
    removeNull, 
    getUrlArgObject,
} from './object';

import { toDecimal2 } from './money';

//时间相关
import { 
    timeToString,
    timeStringToArray,
    timeArrayToString,
    dayArray,
    isLeap,
    timeStringToStamp,
    timeToArray,
    fillzero,
    compareTime
} from './times';

import { toThousands, trim } from './other';

import { validateRules } from './form/validateRules';
import formValidate from './form/formValidate';




export { 
    EventUtil,
    ENVIRONMENT,
    calculationMeter,
    setValue,
    generateUuid,

    supportENV,
    hasPrototype,
    isEqual,
    removeNull,

    toDecimal2,
    toThousands,
    trim,
    getUrlArgObject,

    isWeixinBrowser,
    isAlipayBrowser,
    isAppClient,
    isAndroidClient,
    isIOSClient,

    validateRules,
    formValidate,

    timeToString,
    timeStringToArray,
    timeArrayToString,
    dayArray,
    isLeap,
    timeStringToStamp,
    timeToArray,
    fillzero,
    compareTime
 };
