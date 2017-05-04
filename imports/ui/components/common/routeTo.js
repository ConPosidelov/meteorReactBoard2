import { browserHistory } from 'react-router';

const routeTo = (path) => browserHistory.push(path);
//const routeTo = () => browserHistory.push("/");
export default routeTo;