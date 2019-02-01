import React from "react";
import styled from 'styled-components';

import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

const CardCustom = styled(Card)`
  margin: 10px 0;
  text-align: left;
  border: none;
  display: inline-block;
`;

const CardHeaderCustom = styled(CardHeader)`
  background-color: var(--color-light-purple);
  text-align: 'center';
`;

const CardBodyCustom = styled(CardBody)`
  text-align: left;
  color: black;
`;

class InfoCardComponent extends React.Component {
  render() {
    return (
      <CardCustom>
        <CardHeaderCustom>
          <h5>{this.props.header}</h5>
        </CardHeaderCustom>
        <CardBodyCustom>
          {this.props.children}
        </CardBodyCustom>
      </CardCustom>
    )
  }
}

export default InfoCardComponent;
