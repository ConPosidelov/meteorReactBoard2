import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Row, Col, Glyphicon, Panel, Button } from 'react-bootstrap';
import AvatarImages  from '../../../containers/dashboard/profile/AvatarImages.js';
import LoadAvatarImages  from '../../../containers/dashboard/profile/LoadAvatarImages.js';


class LoadAvatarPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }


    render() {

        return (


            <Row>
                <Col lg={8} md={8}>

                   {/* <AvatarImages/>*/}
                   <AvatarImages/>

                </Col>

                <Col lg={4} md={4}>

                    <LoadAvatarImages/>

                </Col>

            </Row>
        );

    }

}

export default  LoadAvatarPanel ;
