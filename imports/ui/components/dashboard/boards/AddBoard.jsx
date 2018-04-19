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
//import {Boards} from '../../../../api/dashboard/boards/collections.js';

class AddBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVal: "",
      validation: null
    };
    this.addBoard = this.addBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addBoard() {
    //console.log(this.state.nameVal);
    Meteor.call("boards.addNew", this.state.nameVal, (err, res) => {
      //console.log('boards.addNew', res);
    });
    this.setState({ nameVal: "" });
    this.setState({ validation: null });
  }

  handleChange(e) {
    this.setState({ validation: null });
    const value = e.target.value;
    this.setState({ nameVal: value });
    const length = value.length;
    if (length >= 4) this.setState({ validation: "success" });
  }

  render() {
    return (
      <Row>
        <Col lg={4} md={4}>
          <FormGroup
            controlId="contactSearch"
            validationState={this.state.validation}
          >
            <ControlLabel>Create a Board</ControlLabel>
            <FormControl
              type="text"
              value={this.state.nameVal}
              placeholder="Enter Board Name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Must be at least 4 characters</HelpBlock>
          </FormGroup>
        </Col>
        {this.state.validation === "success" ? (
          <Col lg={8} md={8}>
            <Row className="addBoardsGroup">
              <Col lg={1} md={1}>
                <Button bsStyle="primary" onClick={this.addBoard}>
                  Add Board
                </Button>
              </Col>
              <Col lg={2} md={2} />
              <Col lg={5} md={5}>
                <h4>{this.state.nameVal}</h4>
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

export default AddBoard;
