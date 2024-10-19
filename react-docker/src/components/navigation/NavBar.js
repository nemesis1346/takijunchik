import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Media Lengua</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={ROUTES.ROUTE_DATABASE_MEDIA_LENGUA_PAGE}>Media Lengua</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.ROUTE_VOCABULARY}>Vocabulario</Nav.Link>
                                            {/* <li><Link to={ROUTES.ROUTE_UPLOADFILE_PAGE}>Upload File</Link></li> */}
                        <Nav.Link as={Link} to={ROUTES.ROUTE_ABOUT_PAGE}>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;