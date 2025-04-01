import React from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NAV = () => {
    return (
        <>
            <Navbar fixed="top" bg="dark" expand="lg">
                <Navbar.Brand className="text-white mx-auto">Prince Note App</Navbar.Brand>
            </Navbar>
        </>
    );
};

export default NAV;
