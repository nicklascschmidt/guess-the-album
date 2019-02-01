import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavLink } from 'reactstrap';

const NavbarCustom = styled(Navbar)`
  background-color: var(--color-purple-gray);
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
          <NavLink><h2>{this.props.headerText}</h2></NavLink>
        </NavCustom>
      </NavbarCustom>
    )
  }
}

export default NavBar;