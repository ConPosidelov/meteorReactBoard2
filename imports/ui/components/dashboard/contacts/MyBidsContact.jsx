import React from 'react';
import {Row, Col,  Panel} from 'react-bootstrap';

// 3 строки обязательно для матириал УИ
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin ();



import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';






class MyBidsContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.delBid = this.delBid.bind(this);
    }

    delBid(id) {
        console.log("id", id);
        Meteor.call('contact.bid.del', id,  (err, res) => {
            console.log('delBid=res', res);

        });

    }


    render() {
        const {dataList} = this.props;

        //console.log("dataList", dataList);

        let showList = dataList.map((item, key) => {
            return (
            <div key = {'BidsItem_'+ key}>
                <ListItem
                  primaryText={item.fullName +' ( '+item.nicName+' )'}
                  rightIcon={<ActionDelete color={pinkA200} onClick= {()=> this.delBid(item._id)}/>}
                  leftAvatar={<Avatar src={item.avatarSrc}  size={40}/>}

                />
                <Divider inset={true} />
            </div>
            );
        });

        return (
            <MuiThemeProvider>
                <Panel header="Bids" bsStyle="info">
                    <List>

                        {showList}

                    </List>
                </Panel>
            </MuiThemeProvider>

      );
    }
}



export default MyBidsContact;
