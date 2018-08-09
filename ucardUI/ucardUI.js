/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：
@ 功能描述：优卡移动端基础组件
---------------------------------------------------------*/

//数据展示
import LoadList from './loadList/loadList';
import mergeList from './loadList/mergeList';
import LoadListWithKey from './loadList/loadListWithKey';

import ComponentTouch from './componentTouch/componentTouch';
import ComponentInOut from './componentInOut/componentInOut';
import ViewAlbumGroup from './viewAlbumGroup/viewAlbumGroup';
import Img from './img/img';
import Slider from './slider/slider';
import DataIsNull from './unusual/dataIsNull';
import NoNetwork from './unusual/noNetwork';
import Tabbar from './tabbar/tabbar';
import Box from './box/box';


// //数据输入
// import InputAmount from './dataEntry/InputAmount';
import Form from './form/form';
import { Input, inputValidate } from './input/input';
import AutoComplete from './autoComplete/autoComplete';
import SelectDate from './selectDate/selectDate';
import RadioGroup from "./radioGroup/radioGroup.js";
import Radio from "./radioGroup/radio.js";


//布局类组件
import { Media, MediaBody } from './media/media';


// feedback
import MessageTip from './messageTip/messageTip';
import Loading from './loading/loading';
import LoadingCenter from './loadingCenter/loadingCenter';
import Modal from './modal/modal';
import ModelDialog from '../widget/dialog/modelDialog.js'

// general
import Button from './button/button';
import ButtonCountDown from './buttonCountDown/buttonCountDown';

// layout

// navigation

//筛选分类
import ScreeningClass from './screeningClass/screeningClass';
import ScreeningContent from './screeningClass/screeningContent';

// //动画
// Animation

// //手势
// Gesture
// 

export{
    LoadList,
    mergeList,
    LoadListWithKey,

    ComponentTouch,
    ComponentInOut,
    ViewAlbumGroup,
    Img,
    Slider,
    DataIsNull,
    NoNetwork,
    Tabbar,
    Box,
    
    Media, 
    MediaBody,

    MessageTip,
    Loading,
    LoadingCenter,
    Modal,
    ModelDialog,

    Button,
    ButtonCountDown,

    Form,
    Input,
    inputValidate,
    AutoComplete,
    SelectDate,
    RadioGroup,
    Radio,

    ScreeningClass,
    ScreeningContent,
}




