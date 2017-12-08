import React from 'react';
const IMGPATH = cv.IMGPATH;

const CardUser = ({userData}) => {

    let profile = userData.profileExt || '';
    let fullName = profile.fullName || 'fullName';
    let avatarSrc = profile.avatarSrc ;
    let nicName = profile.nicName  || 'nicName';
    let organization = profile.organization || 'organization';
    let country = profile.country || 'country';
    let description = profile.description || '';

    return (

       <div className="panel panel-default card-user">
            <div className="panel-heading">
                <div className="bgImage">
                    <img src="img/background-1.jpg" alt="..."/>
                </div>
                <div className="userAvatar">
                    <img src={IMGPATH + avatarSrc} alt="avatar"/>
                </div>
            </div>
            <div className="panel-body">
                <h4 className="fullName center">{fullName}
                    <br/><a href="#"><small>{nicName}</small></a>

                </h4>
                <div className="description center">

                                    {description}
                </div>
                <div className="organization">
                    <h5>{organization}</h5>
                    <h5>{country}</h5>
                </div>
            </div>

        </div>
    );
};

export default CardUser;
