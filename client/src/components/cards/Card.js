import React from "react";
import styled from 'styled-components';

import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

const CardCustom = styled(Card)`
  margin: ${props => props.margin || '32px'};
`;

const CardHeaderCustom = styled(CardHeader)`
  background-color: #9E7D62;
  color: white;
`;

const CardBodyCustom = styled(CardBody)`
  color: #3F2113;
`;

class CardComponent extends React.Component {
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

export default CardComponent;
