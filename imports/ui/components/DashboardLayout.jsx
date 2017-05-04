import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Navbar, Nav, NavItem,  MenuItem , Glyphicon } from 'react-bootstrap';
import handleLogout from '../../modules/common/handleLogout.js';


class DashboardLayout extends React.Component {

    componentDidMount() {
       {/*console.log('doc=', this.props)*/}
    }


    render() {

        return (

            <div className="DashboardLayout">

                <div className='sideBar'>
                    <div className="sidebar-wrapper">
                    <Link to="/" className="sidebar_brand">
                        <div className="sidebar_brand-logo material-icons">casino</div>
                        <span>The Board</span>
                    </Link>

                    <ul className="nav" >
                        <li className="active">
                            <Link to="/dashboard">
                                <i className="ti-panel"></i>
                                <p>Summary</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/profile">
                                <i className="ti-user"></i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/contacts">
                                <i className="ti-user"></i>
                                <p>Contacts</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/dashboardBoards">
                                <i className="ti-user"></i>
                                <p>Boards</p>
                            </Link>
                        </li>
                    </ul>

                </div>
                </div>

                <div className='dashboardBody'>

                    <div className='bodyTopBar'>

                        <Nav className='bodyNav' bsStyle="pills" pullRight>

                            <NavItem eventKey={1} href="#" >Link1</NavItem>
                            <NavItem eventKey={2} href="#"  >Link2</NavItem>
                            <NavItem eventKey={3} href="#"  >Link3</NavItem>
                            <NavItem eventKey={4} href="#" className='logOut'  title="Logout" onClick={ handleLogout }>
                               <Glyphicon glyph="log-out" />
                            </NavItem>
                        </Nav>
                    </div>

                    {this.props.children}


                </div>
            </div>
        );
    }

};


export default DashboardLayout;
