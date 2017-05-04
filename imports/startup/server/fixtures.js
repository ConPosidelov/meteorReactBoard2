import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

const users = [
{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
},
{
  email: 'aUser@auser.com',
  password: 'psauser',
  profile: {
    name: { first: 'Auser', last: 'Alast' },
  },
  roles: ['customer'],
},
{
  email: 'bUser@buser.com',
  password: 'psbuser',
  profile: {
    name: { first: 'Buser', last: 'Blast' },
  },
  roles: ['customer'],
}
];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});
