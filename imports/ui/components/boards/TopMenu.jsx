import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Glyphicon, Nav, NavItem } from "react-bootstrap";
import {
  Grid,
  Button,
  Icon,
  Menu,
  Segment,
  Divider,
  List
} from "semantic-ui-react";
import handleLogout from "../../../modules/common/handleLogout.js";
import STORE from "../../states/boards.js";
import AvatarInCircle from "../common/user/avatarInCircle.jsx";
import MembersList from "./MembersList.jsx";

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      topMenuStyle: {
        height: "60px"
      }
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.props;
    //const {members} = data;
    const { activeItem, topMenuStyle } = this.state;
    if (activeItem !== nextState.activeItem) return true;
    if (topMenuStyle !== nextState.topMenuStyle) return true;
    return false;
  }
  componentDidMount() {
    const { boards } = this.props.match.params;
    const { activeItem } = this.state;
    STORE.setTopMenu(boards, activeItem);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    const { boards } = this.props.match.params;
    STORE.setTopMenu(boards, name);
  };
  handleShare = () => {};

  render() {
    console.log("TopMenu=", this.props);

    const { activeItem, pushSidebar, topMenuStyle } = this.state;
    const { history, data } = this.props;
    const { nicName, boardName } = data;
    const { match } = this.props;
    const { params } = match;

    return (
      <div className="topMenu">
        <Link to="/dashboard" className="toDashboard">
          <div className="sidebar_brand-logo material-icons">casino</div>
        </Link>
        <div className="boardName">{boardName}</div>
        <div className="topMenuLeftTools">
          <div className="toolsItem">File</div>
          <div className="toolsItem">Edit</div>
          <div className="toolsItem">View</div>
          <div className="toolsItem">Settings</div>
          <div className="toolsItem">Help</div>
        </div>
        {/*
              <List horizontal relaxed className="topMenuLeftTools">
               
                <List.Item>
                  <List.Content floated='left'>
                    <Button icon basic
                      name='div'
                      size='small'
                      active={activeItem === 'div'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='square outline' size='big'/>
                    </Button>
                    <Button icon basic
                      name='cube'
                      size='small'
                      active={activeItem === 'cube'}
                      onClick={this.handleItemClick}
                    >
                      <Icon name='cube' size='big'/>
                    </Button>
                  </List.Content>
                </List.Item>
                
              </List>
              */}
        <div className="userContainer" style={topMenuStyle}>
          <div className="userNav">
            <div className="userNic" title="user Nic">
              {nicName}
            </div>
            <div
              className="logOut"
              title="Logout"
              onClick={() => handleLogout(history)}
            >
              <Glyphicon glyph="log-out" />
            </div>
          </div>
          <div className="userNavTwo">
            <div className="share" title="Share" onClick={this.handleShare}>
              <Button primary>Share</Button>
            </div>
          </div>
        </div>

        <List horizontal floated="right" className="topMenuRightTools">
          {/*
                <List.Item >
                  <List.Content floated='left'>
                    <Button icon basic
                      name='cube4'
                      size='big'
                      active={activeItem === 'cube4'}
                      onClick={this.handleItemClick}
                      >
                      <Icon name='cube' size='big'/>
                    </Button>
                  </List.Content>
                </List.Item>
              */}
          <MembersList params={params} />
        </List>
      </div>
    );
  }
}

export default TopMenu;
