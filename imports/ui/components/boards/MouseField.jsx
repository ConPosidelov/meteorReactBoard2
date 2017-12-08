//  1- ловим мышь и сохраняем координаты в базу
//  2- создаем временный элемент и работаем с ним до сохранения в базу
//  3- сохраняем его в базу
//  
import React ,{ Component }from 'react';
import { Meteor } from 'meteor/meteor';
import {Glyphicon} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import STORE from '../../states/boards.js';
import {throttle, elDimResizeUpdate, elDimUpdate} from '../../../common/mouseHelpers.js'
import Boards from '../../../api/dashboard/boards/collections.js';
import UniversalWrapper  from './UniversalWrapper.jsx';

const updateCursorPos = (outEl, curObj, tic)=>{
    const action = (e) =>{
        let dx = e.pageX - outEl.os.left;
        let dy = e.pageY - outEl.os.top;
        // переводим в проценты с округлением до тысячных
        curObj.x = (dx / outEl.width * 100000 ^ 0) / 1000;
        curObj.y = (dy / outEl.height * 100000 ^ 0) / 1000;
    };
    const actionTic = throttle(action, tic);
    $(document).on("mousemove", actionTic); 
};

const addCursorPos = (el, outEl, boardId, tic)=>{
    const action = (e) =>{
        outEl.width = el.outerWidth();
        outEl.height = el.outerHeight();
        outEl.os = el.offset();
        let dx = e.pageX - outEl.os.left;
        let dy = e.pageY - outEl.os.top;
               
        // переводим в проценты с округлением до тысячных
        let dxPt = (dx / outEl.width * 100000 ^ 0) / 1000;
        let dyPt = (dy / outEl.height * 100000 ^ 0) / 1000;
         
        Meteor.call('boards.addCursorPos', boardId, dxPt, dyPt);
    };
    const actionTic = throttle(action, tic);
    $(document).off("mousemove").on("mousemove", actionTic); 
};

class MouseField extends React.Component {
    constructor(props) {
        super(props);
        this.elProps = {}; // все в пикселях
        this.curObj = {};// все в процентах
        this.state = {
            midleElStyle: {
                width: 0,
                height: 0,
                top : 0,
                left : 0
            }
        };
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const {upTopMenu} = this.props;
        return true
    }

    componentDidMount() {
        const boardId = this.props.boards;
        const el = $('.mouseField');
        let curObj = this.curObj;
        //elDimUpdate(el, this.elProps);
        elDimResizeUpdate (el, this.elProps, 300);//следим за ресайзом mouseField
        addCursorPos(el, this.elProps, boardId, 500);// сохраняем в базу позицию курсора
        updateCursorPos(this.elProps, curObj, 30)// обновляем позицию курсора

        let topMenuState = STORE.getTopMenu(boardId);
        //console.log('getTopMenu=', topMenuState);
        
        $('.mouseField').off("mousedown").on("mousedown", (e) => {
            let onePoint = {...curObj};
            e.preventDefault();
            $(document).on("mousemove.mouseField", (e) => {
                let top, left;
                let width = Math.abs(Math.abs(+curObj.x) - Math.abs(+onePoint.x));
                let height = Math.abs(Math.abs(+curObj.y) - Math.abs(+onePoint.y));
                let dx = +curObj.x - onePoint.x;
                let dy = +curObj.y - onePoint.y;
                dx > 0 ? left = onePoint.x : left = +onePoint.x - width;
                dy > 0 ? top = onePoint.y :  top = +onePoint.y - height;
                this.setState({
                    midleElStyle: {
                        width: `${width}%`,
                        height: `${height}%`,
                        top : `${top}%`,
                        left : `${left}%`
                    }
                });

            });
        });
        $(document).on("mouseup", (e) => {
            $(document).off("mousemove.mouseField");
          //console.log('mouseup');
        });
         
    }

    render() {
        const {midleElStyle} = this.state;
        const {members} = this.props; 
         
        const midleElement = (
            <div className='midleElement' style = {midleElStyle}></div>
        );
   
        const wrapperProps= {
            pos: {
                top: '20',
                left: '40' 
            },
            height: '200',
            unit: 'px'
        };


        return (
            <div className='cursorSynchro mouseField'>
                {midleElement}
                <UniversalWrapper {...wrapperProps} />
            </div>
        );
    }
};


export default MouseField;
