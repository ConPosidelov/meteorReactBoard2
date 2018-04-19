import React, { Component } from "react";
import { composeWithTracker } from "react-komposer";
import { Meteor } from "meteor/meteor";
import Loading from "../../components/Loading.js";

//import MouseField  from '../../components/boards/MouseField.jsx';
import MouseField from "../../components/boards/MouseField_New1.jsx";
import Boards from "../../../api/dashboard/boards/collections.js";

const composer = ({ boards }, onData) => {
  const subscription = Meteor.subscribe("boards.members", boards);

  if (subscription.ready()) {
    let doc = Boards.find(
      { _id: boards },
      { fields: { members: 1 } }
    ).fetch()[0];
    let { members } = doc;
    let newMembers = members.map(item => {
      if (item.id !== Meteor.userId()) {
        return {
          avatarSrc: item.avatarSrc,
          active: item.active,
          nicName: item.nicName,
          color: item.color,
          cursorX: item.cursorX,
          cursorY: item.cursorY
        };
      } else {
        return {};
      }
    });
    onData(null, {});
  }
};

const WithTracker = composeWithTracker(composer, Loading)(MouseField);

export default WithTracker;
