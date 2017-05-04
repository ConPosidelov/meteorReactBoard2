import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Boards from '../collections.js';

Meteor.publish('boards.list', () => Boards.find());

Meteor.publish('boards.view', (_id) => {
  check(_id, String);
  return Boards.find(_id);
});
