import React from 'react';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavLink } from 'reactstrap';

const LinkContainerCustom = styled(LinkContainer)`
  color: darkred;
  cursor: pointer;
  :hover {
    color: red;
  }
`;
const NavbarCustom = styled(Navbar)`
  /* background-color: darkcrimson; */
  position: relative;
  margin: 0 0 20px 0;
  `;
const NavCustom = styled(Nav)`
  margin: auto;
`;

class NavBar extends React.Component {

  render() {
    return (
      <NavbarCustom>
        <NavCustom>
          <LinkContainerCustom to={this.props.toLink}>
            <NavLink><h3><strong>{this.props.headerText}</strong></h3></NavLink>
          </LinkContainerCustom>
        </NavCustom>
      </NavbarCustom>
    )
  }
}

export default NavBar;