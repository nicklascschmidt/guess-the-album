import React from "react";
import styled from 'styled-components';
import { Col } from 'reactstrap';

const ColCustom = styled(Col)`
  margin: 10px 0;
`;

class ColComponent extends React.Component {
  render() {
    return (
      <ColCustom xs="12" sm='12' md='12' lg='6'>
        {this.props.children}
      </ColCustom>
    )
  }
}

export default ColComponent;
