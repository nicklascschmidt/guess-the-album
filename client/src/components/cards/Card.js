import React from "react";
import styled from 'styled-components';

import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

const CardCustom = styled(Card)`
  margin: ${props => props.margin || '0'};
  border: none;
  width: ${props => props.width || '100%'};
  display: inline-block;
`;

const CardHeaderCustom = styled(CardHeader)`
  background-color: var(--color-light-purple);
  text-align: ${props => props.headerAlign || 'center'};
`;

const CardBodyCustom = styled(CardBody)`
  text-align: ${props => props.textAlign || 'center'};
  color: black;
`;

class CardComponent extends React.Component {
  render() {
    return (
      <CardCustom width={this.props.width} margin={this.props.margin}>
        <CardHeaderCustom headerAlign={this.props.headerAlign}>
          <h5>{this.props.header}</h5>
        </CardHeaderCustom>
        <CardBodyCustom textAlign={this.props.textAlign}>
          {this.props.children}
        </CardBodyCustom>
      </CardCustom>
    )
  }
}

export default CardComponent;
