// @flow
import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
class Navigation extends React.PureComponent<{}> {
    render(): React.Node {
        return (<Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Weather App</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="/">App</NavItem>
                <NavItem eventKey={2} href="/styled">Styled Component</NavItem>
            </Nav>
        </Navbar>);
    }
}

export default Navigation;