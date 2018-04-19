import { Meteor } from 'meteor/meteor';

Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll('blob:');
  BrowserPolicy.content.allowOriginForAll('*.cloudflare.com');
  BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
  BrowserPolicy.content.allowImageOrigin( 'http://192.168.1.101');
  BrowserPolicy.content.allowImageOrigin( 'http://192.168.1.100');
  BrowserPolicy.content.allowDataUrlForAll();;
});
