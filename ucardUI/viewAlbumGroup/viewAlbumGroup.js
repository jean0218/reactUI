/*---------------------------------------------------------
@ 创建时间：20170830
@ 创 建 者：lunjiao.peng
@ 功能描述：查看相册详情组件
@ param：
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Img from '../img/img';
import Carousel from '../carousel/carousel';


let touchIMG = {
  startPos: {},
  movePos: {x:0,y:0},
  isScrolling:0, //isScrolling为1时，表示纵向滑动，0为横向滑动
}

export default class ViewAlbumGroup extends Component{
    static propTypes = {
        className:PropTypes.string,
        photoArray:PropTypes.array,
        onChange:PropTypes.func,
    };

    static defaultProps = {
        defaultIndex:0,
        onChange:()=>{},
    };

    constructor(props){
        super(props);        
        this.handleContentClick = this.handleContentClick.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.state = {
            activeIndex:this.props.defaultIndex
        }
    }

    // componentDidMount(){
    //     //隐藏body的滚动条
    //     document.body.style.overflow = 'hidden';
    // }

    
    // componentWillUmmount(){
    //     //显示body的滚动条
    //     document.body.style.overflow = 'auto';
    // }
    handleContentClick(){
        this.props.onChange({
            open:false,
        });
    }
  
    handleChangeImg(newState){
        this.setState({
            activeIndex:newState.activeIndex
        })
    }

    renderHeader(){
        const { photoArray } = this.props;
        let { activeIndex } = this.state;
        activeIndex = activeIndex + 1;
        const photoArrayLen = photoArray.length;
        return(
            <div className = "view-album-group-header">
                <span className = 'title'>{photoArrayLen + '/' + activeIndex}</span>
            </div>
        )
    }
    renderContent(){
        const { photoArray } = this.props;
        const { activeIndex } = this.state;
        return(
            <Carousel
                className = "view-album-group-content"
                photoArray = {photoArray}
                defaultIndex = {activeIndex}
                onChange = {this.handleChangeImg}
            />
        )
    }

    render(){
        const { src, photoArray } = this.props;
        return(
            <div 
                className = "view-album-group"
                onClick = {this.handleContentClick}
            >
                {this.renderHeader()}
                {this.renderContent()}
                
            </div>
            
        )
    }
}