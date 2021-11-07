import React from 'react';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export {NavBar}
function NavBar(props) {//Navigation bar component 
    
    return(
        <Navbar bg="light" variant="light">
            <Container>
            <Nav className="me-auto">
                <Nav.Link href="/">Currency converter</Nav.Link>
                <Nav.Link href="Rates">Rates</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}