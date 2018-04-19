import React from "react";
//import { Link } from 'react-router';
import {
  Row,
  Col,
  Glyphicon,
  Panel,
  Button,
  Tab,
  Nav,
  NavItem
} from "react-bootstrap";
import AddContact from "../../components/dashboard/contacts/AddContact.jsx";
import MyContact from "../../components/dashboard/contacts/MyContact.jsx";
import MyBidsContact from "../../components/dashboard/contacts/MyBidsContact.jsx";
import OffersContact from "../../components/dashboard/contacts/OffersContact.jsx";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      bids: [],
      offers: []
    };
    this.updateContacts = this.updateContacts.bind(this);
    this.updateBids = this.updateBids.bind(this);
    this.updateOffers = this.updateOffers.bind(this);
    this.clickContact = this.clickContact.bind(this);
  }
  componentWillMount() {
    this.updateContacts(this.props.data.contacts);
    this.updateBids(this.props.data.contacts);
    this.updateOffers(this.props.data.contacts);
  }
  componentWillReceiveProps(nextProps) {
    const { contacts, bids, offers } = this.props.data.contacts;
    const contactsLength = contacts.length;
    const bidsLength = bids.length;
    const offersLength = offers.length;
    const next = nextProps.data.contacts;
    if (contactsLength != next.contacts.length) this.updateContacts(next);
    if (bidsLength != next.bids.length) this.updateBids(next);
    if (offersLength != next.offers.length) this.updateOffers(next);
  }
  updateContacts(cont) {
    const { contacts } = cont;
    // console.log('contacts', contacts);
    Meteor.call("contactsData.get", contacts, (err, res) => {
      //console.log('res', res);
      this.setState({ contacts: res });
    });
  }

  updateBids(cont) {
    const { bids } = cont;
    Meteor.call("contactsData.get", bids, (err, res) => {
      this.setState({ bids: res });
    });
  }
  updateOffers(cont) {
    const { offers } = cont;
    Meteor.call("contactsData.get", offers, (err, res) => {
      this.setState({ offers: res });
    });
  }
  clickContact(contact) {
    //console.log('contact', contact);
  }

  render() {
    return (
      <div className="dashboardContacts">
        <AddContact />
        {/*

*/}
        <Tab.Container
          id="contactTabs"
          className="contactTabs"
          defaultActiveKey="contacts"
        >
          <Row>
            <Col lg={6} md={6}>
              <Row>
                <Col lg={12} md={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="contacts">Contacts</NavItem>
                    <NavItem eventKey="bids">Bids</NavItem>
                    <NavItem eventKey="offers">Offers</NavItem>
                  </Nav>
                </Col>
              </Row>

              <Row>
                <Col lg={12} md={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="contacts">
                      <MyContact
                        dataList={this.state.contacts}
                        clickContact={this.clickContact}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bids">
                      <MyBidsContact dataList={this.state.bids} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="offers">
                      <OffersContact dataList={this.state.offers} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Contacts;
