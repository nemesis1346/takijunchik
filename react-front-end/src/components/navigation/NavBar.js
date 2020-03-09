import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const NavBar = (props) => {
    return (
        <nav className="nav wrapper blue darken-3">
            <div className="container">
                <a className="brand-logo">Media Lengua</a>
                <ul className="right">
                    {/* LINK do the same as event.preventDefault */}
                    <li><Link to={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE}>Database Media Lengua</Link></li>
                    <li><Link to={ROUTES.ROUTE_UPLOADFILE_PAGE}>Upload File</Link></li>
                    <li><Link to={ROUTES.ROUTE_ABOUT_PAGE}>About</Link></li>
                </ul>
            </div>
        </nav>
    );
}
//with Router is for givin the navbar the props input as a router
export default withRouter(NavBar);