import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';

const NavBar = (props) => {
    console.log(props);
    return (
        <nav className="nav wrapper blue darken-3">
            <div className="container">
                <a className="brand-logo">Media Lengua</a>
                <ul className="right">
                    {/* LINK do the same as event.preventDefault */}
                    <li><Link to="/DatabasePage">Database</Link></li>
                    <li><Link to="/UploadFilePage">Upload File</Link></li>
                    <li><Link to='/AboutPage'>About</Link></li>
                </ul>
            </div>
        </nav>
    );
}
//with Router is for givin the navbar the props input as a router
export default withRouter(NavBar);