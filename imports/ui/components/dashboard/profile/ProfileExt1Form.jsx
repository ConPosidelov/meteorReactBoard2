import React from 'react';
import {AutoForm, AutoField, LongTextField, ErrorsField, SubmitField} from 'uniforms-bootstrap3';
import  { Schema } from '../../../../common/shemas.js';
import {Form, FormGroup, ControlLabel, FormControl, Button, Col, Label} from 'react-bootstrap';

import { Meteor } from 'meteor/meteor';


const resetForm = (obj) => {
    for (key in obj) {
        obj[key].value = '';
    }
};

class ProfileExt1Form  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isNicName: true,
          warning: ''
        };
    }

    getValidationState = () => {
        if(this.state.warning !== '' ) {
            return 'error'
        } else {
            return null
        }
    }

    submitHdlr = (e) => {
        e.preventDefault();
        let inp = this.i;
        let doc = {};

        inp.nicName.value ? doc.nicName = inp.nicName.value : '';
        inp.fullName.value ? doc.fullName = inp.fullName.value : '' ;
        inp.organization.value ? doc.organization = inp.organization.value : '';
        inp.country.value ? doc.country = inp.country.value : '';
        inp.description.value ? doc.description = inp.description.value : '';
        //console.log(doc);
        if(this.state.isNicName){
            Meteor.call('users.profileExt1.update', doc, (err, res) => {
                if(res === 'notExist') {
                    this.setState({warning: '@NicName required !!!'})
                } else {
                    resetForm(inp);
                }

            });
        } else {
            this.setState({warning: 'This nicName already exist !!!'})
        }
    }

    changeNicName = (e) => {
        let val = e.target.value;
        this.setState({warning: ''});
        if(val.length > 0 && ( val.length < 4 || val.charAt(0) !== '@')) {
            this.setState({warning: 'It requires a minimum of 4 characters & first @'});
        } else {
            Meteor.call('users.profileExt1.check', val, (err, res) => {
              if(res === 'notUnique') {
                 this.setState({isNicName: false});
                 this.setState({warning: 'This nicName already exist !!!'});

              } else {
                 this.setState({isNicName: true});
                 this.setState({warning: ''});
              }
            });
        }
    }

    render() {
        this.i = {};

    return (


        <Form horizontal onSubmit={e=>this.submitHdlr(e)}>
            <FormGroup validationState={this.getValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                    NicName *
                </Col>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <FormControl
                         type="text"
                         placeholder="@nicName"
                         inputRef={ref=>this.i.nicName=ref}
                         onChange={this.changeNicName}
                         />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    FullName
                </Col>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="FullName" inputRef={ref=>this.i.fullName=ref}/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Organization
                </Col>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Organization" inputRef={ref=>this.i.organization=ref}/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Country
                </Col>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <FormControl type="text" placeholder="Country" inputRef={ref=>this.i.country=ref}/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <FormControl componentClass="textarea" placeholder="description" inputRef={ref=>this.i.description=ref}/>
                </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={2}>
                <Button bsStyle="info"  type="submit">
                  Submit
                </Button>
              </Col>
              <Col sm={2}></Col>
              <Col sm={8}>
                  <h4>
                      <Label bsStyle="danger">{this.state.warning}</Label>
                  </h4>
              </Col>
            </FormGroup>

        </Form>

    );
    }
};

export default ProfileExt1Form;
