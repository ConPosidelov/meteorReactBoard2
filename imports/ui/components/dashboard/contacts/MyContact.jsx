import React from 'react';
import {Row, Col,  Panel} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const IMGPATH = cv.IMGPATH;

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';



class MyContact extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const {dataList} = this.props;

        let showList = dataList.map((item, key) => {
            return (
            <div key = {'ContactItem_'+ key}>
                <ListItem
                  primaryText={item.fullName +' ( '+item.nicName+' )'}
                  rightIcon={<ActionGrade color={pinkA200} />}
                  leftAvatar={<Avatar src={IMGPATH + item.avatarSrc} size={40}/>}
                  onClick={()=>this.props.clickContact(item)}
                />
                <Divider inset={true} />
            </div>
            );
        });

        return (
            <MuiThemeProvider>
                <Panel header="Contacts" bsStyle="info">
                    <List>
                        {showList}
                    </List>
                </Panel>
            </MuiThemeProvider>

      );
    }
}




export default MyContact;
