import {Redirect, withRouter} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
//import {history} from '../../startup/client/myHistory';

/*const handleLogout = withRouter(({history}) => {
    console.log('handleLogout', history);
    Meteor.logout(() => history.push('/login'))

});
*/
const handleLogout = (history) => {
    console.log('handleLogout');
    //Meteor.logout(() => history.push('/login'));
    Meteor.logout();
    history.push('/login');
};







export default handleLogout;