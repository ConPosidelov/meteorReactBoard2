import React from 'react';
//import { Grid } from 'react-bootstrap';
//import Home from '../containers/Home.js';

const App = ({ children }) => (
    <div> 
        { children }
    </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
