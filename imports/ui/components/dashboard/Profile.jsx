import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Glyphicon, Panel, Button } from 'react-bootstrap';
import ProfileExt1Form  from './profile/ProfileExt1Form.jsx';
import ShowAvatarWith  from './profile/ShowAvatarWith.jsx';
import LoadAvatarPanel  from './profile/LoadAvatarPanel.jsx';
//import LoadAvatarImages  from '../../containers/dashboard/LoadAvatarImages.js';

import CardUser  from '../../containers/dashboard/profile/CardUser.js';

import { Meteor } from 'meteor/meteor';





class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showAvatarePanel: false,
          loadAvatarPanel: false
        };
        this.getTypeOfAvatar = this.getTypeOfAvatar.bind(this);
        this.showAvatarSet = this.showAvatarSet.bind(this);
    }

    componentDidMount() {
       this.getTypeOfAvatar();
    }

    getTypeOfAvatar() {
        let profile = this.props.userData.profileExt;
        //console.log('Profile============', profile.avatarWith);
        if(profile.avatarWith === 'own'){
            this.setState({loadAvatarPanel: true});
        }
    }
    showAvatarSet(value) {
        //console.log('showAvatarSet',value);
        if(value === 'own'){
            this.setState({loadAvatarPanel: true});
        } else {
            this.setState({loadAvatarPanel: false});
        }

    }
     showAvatarePanel = () => this.setState({ showAvatarePanel: !this.state.showAvatarePanel });


    render() {

        return (

            <div className='bodyContentProfile'>
                <Row>
                    <Col lg={6} md={6}>
                        <CardUser/>
                    </Col> {/*-- end col-lg-6 col-md-6 */}

                    <Col lg={6} md={6}>
                        <div className="panel panel-default editProfile">
                            <div className="panel-heading">
                                <h3 className="panel-title">Edit Profile</h3>
                            </div>
                            <div className="panel-body">
                                <ProfileExt1Form/>
                            </div>
                        </div>
                    </Col>{/*-- end col-lg-6 col-md-6 */}
                </Row>
                <Row>
                    <Col lg={12} md={12}>
                        <Button onClick={this.showAvatarePanel}>
                          Show avatar with
                        </Button>
                        <Panel collapsible expanded={this.state.showAvatarePanel}>
                            <ShowAvatarWith showAvatarSet={this.showAvatarSet}/>
                        </Panel>
                    </Col>
                </Row>

                { this.state.loadAvatarPanel ? <LoadAvatarPanel/> : ''}


            </div>

        );

    }

}

export default Profile;
