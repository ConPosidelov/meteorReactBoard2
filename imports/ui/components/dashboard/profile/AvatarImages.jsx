import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Glyphicon, Panel, Button } from 'react-bootstrap';

const IMGPATH = cv.IMGPATH;


class AvatarImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUpload: false
        };
        this.selectAvatar = this.selectAvatar.bind(this);
    }


    selectAvatar (src) {
        Meteor.call('users.profileExt3.update', src);

    }


    render() {

        let avatarImages = this.props.avatarImages;

        let showAvatars = avatarImages.map((aFile, key) => {

            let avatarSrc = IMGPATH + aFile._id + '.'+ aFile.ext;

            return (
                <div className="avatarImages" key={'img' + key}
                    onClick={(e)=>{
                    this.selectAvatar(avatarSrc)
                    }}>

                    <img src={avatarSrc} width="100" height="100" alt="avatar"/>

                </div>
            );

        });

        return (
            <Panel className='selectAnAvatar' header='Select an avatar' bsStyle="info">
                {showAvatars}
            </Panel>
        );
    }
}

export default AvatarImages;
