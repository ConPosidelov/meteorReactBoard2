import React from 'react';



const avatarInCircle = ({ imgPath, size, color, float, border }) => {
    let content = '';
    if(!color) color = 'orange';
    if(!size) size = '40';

    let style = {
        border: `solid ${size/10}px ${color}`,
        width : `${size}px`,
        height : `${size}px`,
        fontSize: `${size * .7}px`,
        paddingTop: `${size * .35}px`
    }
    if(border) style.border = border;

    if(!imgPath) {
        let h = Math.floor(Math.random() * 360);
        let bgColor = `hsl(${h}, 80%, 80%)`;
        style.backgroundColor = bgColor;
        let abc = 'qwertyuiopasdfghjklzxcvbnm';
        let abcLength = abc.length;
        content = abc[Math.floor(Math.random() * abcLength)];
    } else {
        style.background = `url('${imgPath}') transparent center center no-repeat`;
    }

    if(float) {
        style.float = float;
    }

    return (
        <div className="avatarInCircle" style={style}>{content}</div>
    );

}


export default avatarInCircle;
