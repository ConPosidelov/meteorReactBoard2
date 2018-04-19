import { Meteor } from "meteor/meteor";
import Loading from "../Loading.js";
import { List } from "semantic-ui-react";
import AvatarInCircle from "../common/user/avatarInCircle.jsx";
import Boards from "../../../api/dashboard/boards/collections.js";

class MembersList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { members } = this.props.data;
    const nextMembers = nextProps.data.members;
    let countMembers = 0;
    let countNextMembers = 0;
    members.forEach((item, i) => {
      if (item.active) countMembers++;
    });
    nextMembers.forEach((item, i) => {
      if (item.active) countNextMembers++;
    });
    if (countMembers === countNextMembers) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    const { data } = this.props;
    const { members } = data;

    let membersList = members.map((item, index) => {
      if (item.active === false) return;
      return (
        <List.Content floated="left" key={index}>
          <AvatarInCircle
            size={40}
            border={`solid 3px ${item.color}`}
            {...item}
          />
        </List.Content>
      );
    });

    return <List.Item className="membersList">{membersList}</List.Item>;
  }
}

let timeStamp = 99999999999999; 
const step = 10000;

const boardLogOut = (boardId, userId) => {
  Meteor.call("boards.LogOut", boardId, userId, (err, res) => {
    if (res) console.log("boards.LogOut=====", res);
  });
};

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe("boards.members", params.boards);

  if (subscription.ready()) {
    let doc = Boards.find(
      { _id: params.boards },
      { fields: { members: 1 } }
    ).fetch()[0];
    let { members } = doc;
    let newMembers = members.map(item => {
      if (item.id === Meteor.userId()) {
        item.active = true;
        if (!item.timestamp) item.timestamp = timeStamp;
        timeStamp = item.timestamp;
      }
      if (item.active && item.timestamp) {
        let checkTimestamp = item.timestamp + 2 * step;
        if (checkTimestamp > timeStamp) {
          item.active = true;
        } else {
          item.active = false;
          boardLogOut(params.boards, item.id);
        }
        return item;
      } else {
        item.active = false;
        return item;
      }
    });
    doc.members = newMembers;

    onData(null, { data: doc });
  }
};

const MemberListWithData = composeWithTracker(composer, Loading)(MembersList);

const WrapperComp = props => {
  const { params } = props;
  return <MemberListWithData {...props} />;
};

export default WrapperComp;
