import React from "react";
import { Meteor } from "meteor/meteor";
import { Row, Col, Glyphicon, Panel, Button } from "react-bootstrap";

const IMGPATH = cv.IMGPATH;

class AvatarImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUpload: false
    };
  }

  saveAvatar = src => {
    Meteor.call("users.profileExt3.update", src);
  };

  render() {
    const { avatarImages } = this.props;

    let showAvatars = avatarImages.map((item, i) => {
      let imgName = item._id + "." + item.ext;
      //console.log('imgName', imgName);
      let avatarSrc = IMGPATH + imgName;
      //console.log('avatarSrc', avatarSrc);
      return (
        <div
          className="avatarImages"
          key={"img" + i}
          onClick={e => {
            this.saveAvatar(imgName);
          }}
        >
          <img src={avatarSrc} width="100" height="100" alt="avatar" />
        </div>
      );
    });

    return (
      <Panel
        className="selectAnAvatar"
        header="Select an avatar"
        bsStyle="info"
      >
        {showAvatars}
      </Panel>
    );
  }
}

export default AvatarImages;

