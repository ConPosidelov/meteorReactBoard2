import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  Grid,
  Button,
  Icon,
  Menu,
  Sidebar,
  Segment,
  Header,
  Container
} from "semantic-ui-react";
import TopMenu from "../components/boards/TopMenu.jsx";
import ToolMenu from "../components/boards/ToolMenu.jsx";
import LeftToolBar from "../components/boards/LeftToolBar.jsx";
import MouseField from "../containers/boards/MouseField.js";
import ElementsField from "../containers/boards/ElementsField.js";
import CursorField from "../containers/boards/CursorField.js";

let timerId;
let timeStamp;
const step = 10000;
const timerF = function(params) {
  timerId = setInterval(function() {
    Meteor.call("boards.SetTimestamp", params, (err, res) => {
      if (res) timeStamp = res;
    });
  }, step);
};
const boardLogOut = (boardId, userId) => {
  clearInterval(timerId);
  Meteor.call("boards.LogOut", boardId, userId, (err, res) => {
    if (res) console.log("boards.LogOut=====", res);
  });
};

class BoardsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsTopMenu: true,
      collapsToolbar: true,
      onMouses: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { collapsTopMenu, collapsToolbar, onMouses } = this.state;
    if (collapsTopMenu !== nextState.collapsTopMenu) return true;
    if (collapsToolbar !== nextState.collapsToolbar) return true;
    if (onMouses !== nextState.onMouses) return true;
    return false;
  }

  componentDidMount() {
    const { match } = this.props;
    timerF(match.params.boards);
  }

  componentWillUnmount() {
    const { match } = this.props;
    const { params } = match;
    console.log("BoardsLayoutWillUnmount");
    boardLogOut(params.boards, Meteor.userId());
  }

  fromToolMenu = e => {
    const { collapsTopMenu, collapsToolbar, onMouses } = this.state;
    const { target } = e;
    const name = target.parentNode.getAttribute("name");
    switch (name) {
      case "upTopMenu":
        this.setState({ collapsTopMenu: !collapsTopMenu });
        break;
      case "openToolbar":
        this.setState({ collapsToolbar: !collapsToolbar });
        break;
      case "onMouses":
        this.setState({ onMouses: !onMouses });
        break;
      default:
        console.log("Неизвестная кнопка =", name);
    }
  };

  render() {
    const { collapsTopMenu, collapsToolbar, onMouses } = this.state;
    const { boards } = this.props.match.params;

    return (
      <div
        className={
          collapsTopMenu ? "boardsLayout" : "boardsLayout collapsTopMenu"
        }
      >
        <TopMenu {...this.props} />
        <ToolMenu {...this.props} fromToolMenu={this.fromToolMenu} />
        <div className={collapsToolbar ? "boardsBody" : "boardsBody active"}>
          <LeftToolBar
            className="leftToolBar"
            collapsToolbar={collapsToolbar}
            {...this.props}
          />

          <div className="boardsBodyContent ">
            <CursorField boards={boards} onMouses={onMouses} />
            <MouseField boards={boards} upTopMenu={collapsTopMenu} />
          </div>
        </div>
      </div>
    );
  }
}

export default BoardsLayout;

