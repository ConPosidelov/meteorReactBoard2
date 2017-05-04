import React from 'react';
import {Row, Col,  Panel} from 'react-bootstrap';

// 3 строки обязательно для матириал УИ
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin ();



import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';



class OffersContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.acceptOffers = this.acceptOffers.bind(this);
    }


    acceptOffers(id) {
        console.log("acceptOffers", id);
        Meteor.call('contact.offers.accept', id,  (err, res) => {
            console.log('accept=res', res);

        });

    }

    render() {
        const {dataList} = this.props;

        //console.log("dataList", dataList);

        let showList = dataList.map((item, key) => {
            return (
            <div key = {'OffersItem_'+ key}>
                <ListItem
                  primaryText={item.fullName +' ( '+item.nicName+' )'}
                  rightIcon={<ActionGrade color={pinkA200} />}
                  leftAvatar={<Avatar src={item.avatarSrc}  size={40}/>}
                  onClick= {()=> this.acceptOffers(item._id)}
                />
                <Divider inset={true} />
            </div>
            );
        });

        return (
            <MuiThemeProvider>
                <Panel header="Offers" bsStyle="info">
                    <List>

                        {showList}

                    </List>
                </Panel>
            </MuiThemeProvider>

      );
    }
}





export default OffersContact;
