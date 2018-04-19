import React from "react";
import {
  Row,
  Col,
  Glyphicon,
  Panel,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
      validationSearch: null,
      findedName: "",
      findId: ""
    };

    this.addContactHldr = this.addContactHldr.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addContactHldr() {
    const id = this.state.findedId;
    Meteor.call("contact.bid.add", id, (err, res) => {
      console.log("contact.bid.add", res);
    });
    this.setState({ valueSearch: "" });
    this.setState({ validationSearch: null });
  }

  handleChange(e) {
    this.setState({ validationSearch: null });

    let value = e.target.value;
    this.setState({ valueSearch: value });
    const length = value.length;

    if (length >= 4 && value.charAt(0) === "@") {
      Meteor.call("contact.byNicName.get", value, (err, res) => {
        //console.log('contacts.allNicNames.get--res', res);
        if (res) {
          this.setState({ validationSearch: "success" });
          this.setState({ findedName: res.fullName });
          this.setState({ findedId: res._id });
        }
      });
    }
  }

  render() {
    return (
      <Row>
        <Col lg={4} md={4}>
          <FormGroup
            controlId="contactSearch"
            validationState={this.state.validationSearch}
          >
            <ControlLabel>Find a contact</ControlLabel>
            <FormControl
              type="text"
              value={this.state.valueSearch}
              placeholder="Enter @nicName"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>@nicName should begin with @</HelpBlock>
          </FormGroup>
        </Col>
        {this.state.validationSearch === "success" ? (
          <Col lg={8} md={8}>
            <Row className="addContactGroup">
              <Col lg={1} md={1}>
                <Button bsStyle="primary" onClick={this.addContactHldr}>
                  Add Contact
                </Button>
              </Col>
              <Col lg={2} md={2} />
              <Col lg={5} md={5}>
                <h4>{this.state.findedName}</h4>
              </Col>
            </Row>
          </Col>
        ) : (
          ""
        )}
      </Row>
    );
  }
}

export default AddContact;

