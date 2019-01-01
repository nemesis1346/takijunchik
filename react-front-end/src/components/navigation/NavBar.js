import React from 'react';

const NavBar = () => {

    return (
        <nav className="nav wrapper blue darken-3">
            <div className="container">
                <a className="brand-logo">Media Lengua</a>
                <ul className="right">
                    <li><a href="/DatabasePage">Database</a></li>
                    <li><a href="/UploadFilePage">Upload File</a></li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;