import React from "react";
import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';

const CardCustom = styled(Card)`
  margin: 0;
  border: none;
  width: 100%;
  display: inline-block;
`;

const CardBodyCustom = styled(CardBody)`
  color: black;
  border: none;
  text-align: ${props => props.textAlign || 'center'};
  position:'relative';
`;

class QuestionCardComponent extends React.Component {
  render() {
    return (
      <CardCustom width={this.props.width} margin={this.props.margin}>
        <CardBodyCustom style={{postition:'relative'}}>
          <h5 style={{textAlign:'right', backgroundColor:'#58BC82', color: 'white', position:'absolute', right:'0', top:'0', padding:'10px', borderRadius:'0 4px 0 5px', overflow:'hidden'}}>{this.props.count} of 5</h5>
          {this.props.children}
        </CardBodyCustom>
      </CardCustom>
    )
  }
}

export default QuestionCardComponent;
