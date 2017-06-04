import { Mongo } from 'meteor/mongo';

const Messages = new Mongo.Collection('Messages');
export default Messages;
/*
Messages.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Messages.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});
*/