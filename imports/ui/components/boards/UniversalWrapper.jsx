import React ,{ Component }from 'react';
import STORE from '../../states/boards.js';



class UniversalWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props    
        };
    }


    componentDidMount() {
        const className = this.wrapper.getAttribute('class');
        const {dataId} = this.props;
        const data = this.state;
        const dataObj = {
                dataId: dataId,
                data: data,
                callback: this.getData,
                name: className
              };
        STORE.setSubscription(dataObj);
    }
    componentDidUpdate(prevProps, prevState)  {
        const {dataId} = prevProps;
        const className = this.wrapper.getAttribute('class');
        const data = this.state;
        let dataObj = {
            dataId: dataId,
            data: data,
            callback: this.getData,
            name: className
        };
        STORE.setSubscription(dataObj);
    }


    getData = (data)=> {
        //console.log('GetData=', data);
        this.setState({
            pos: data
        });
    };

    render() {
        //console.log('UniversalWrapper=', this.props);
        const {dataId} = this.props;
        const {
            unit='px',
            pos:{
                unitPos='%',
                top='0',
                left='0'
            },
            width='100',
            height='100',
            borderWidth='1',
            borderColor='#000000',
            pointSize='10',
            style,
            content
        } = this.state; 
          
        const actualStyle = {
            border: `solid ${borderWidth}px ${borderColor}`,
            width : `${width}${unit}`,
            height : `${height}${unit}`,
            top: `${top}${unitPos}`,
            left: `${left}${unitPos}`
        };
        const pointStyle = {
            width : `${pointSize}px`,
            height : `${pointSize}px`,
            marginLeft: `${-pointSize/2}px`,
            marginTop: `${-pointSize/2}px`
        };
        //--------------------------------------
        const leftTopStyle =     {top: '0',    left: '0'};
        const leftBottomStyle =  {top: '100%', left: '0'};
        const rightTopStyle =    {top: '0',    left: '100%'};
        const rightBottomStyle = {top: '100%', left: '100%'};

        const topStyle =         {top: '0',    left: '50%'};
        const leftStyle =        {top: '50%', left: '0'};
        const rightStyle =       {top: '50%',    left: '100%'};
        const bottomStyle =      {top: '100%', left: '50%'};
        //----------------------------------------


         
        return (

            <div
                className='universalWrapper'
                style= {style? style: actualStyle} 
                ref= {wrapper => this.wrapper = wrapper}
                data-id = {dataId}

                >

                <div className='controlPoint' style= {{...pointStyle, ...leftTopStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...leftBottomStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...rightTopStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...rightBottomStyle}}></div>

                <div className='controlPoint' style= {{...pointStyle, ...topStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...leftStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...rightStyle}}></div>
                <div className='controlPoint' style= {{...pointStyle, ...bottomStyle}}></div>

                {content ? content: ''}

            </div>
        );

    }    

};

export default UniversalWrapper;    