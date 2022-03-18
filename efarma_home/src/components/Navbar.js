import React, { useState } from 'react'
import { Collapse, Nav, Navbar as RSNavbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Block } from './utils';

export default function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <RSNavbar color="light" light expand="md">
            <Block width="10px" height="10px" />
            <Block width="10px" height="10px" />
            <NavbarBrand href="/" style={{ fontFamily: "cursive" }}><b>e-Farma</b></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <div style={{ paddingLeft: "20px", textAlign: "left"}}>
                    <Nav className="mr-auto" navbar>
                        <Block width="10px" height="10px" />
                        <NavItem><NavLink>
                            <a href="http://localhost:3002/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                Market Place
                            </a>
                        </NavLink></NavItem>
                        <Block width="10px" height="10px" />
                        <NavItem><NavLink>
                            <a href="http://localhost:3004/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                Chat Forum
                            </a>
                        </NavLink></NavItem>
                        <Block width="10px" height="10px" />
                        <NavItem><NavLink>
                            <a href="/crop_recommendation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                Crop Recommendation
                            </a>
                        </NavLink></NavItem>
                        <Block width="10px" height="10px" />                    
                    </Nav>
                </div>
            </Collapse>
        </RSNavbar>
    )
}