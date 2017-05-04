import { Mongo } from 'meteor/mongo';

const Boards = new Mongo.Collection('Boards');
export default Boards;

Boards.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Boards.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

