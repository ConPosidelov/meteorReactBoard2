import React from 'react';
import { Meteor } from 'meteor/meteor';


const ShowAvatarWith = (props) => {

    const saveValue = (value) => {
        Meteor.call('users.profileExt2.update', value);
    }

    return (

        <form role="form" className="formUser profileExt2">
            <div className="form-group radio showAvatarWith"  onChange={
                (e) => {
                    let value = e.target.value;
                    saveValue(value);
                    props.showAvatarSet(value);
                }
            }>
                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="Facebook"/>
                    <p>Facebook</p>
                </label>
                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="Google"/>
                    <p>Google</p>
                </label>
                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="Twitter"/>
                    <p>Twitter</p>
                </label>
                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="GitHub"/>
                    <p>GitHub</p>
                </label>
                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="LinkedIn"/>
                    <p>LinkedIn</p>
                </label>

                <label className="control-label">
                    <input type="radio" name="showAvatar" className="optionShowAvatar" value="own"/>
                    <p>own</p>
                </label>
            </div>
        </form>


    );
};

export default ShowAvatarWith;
