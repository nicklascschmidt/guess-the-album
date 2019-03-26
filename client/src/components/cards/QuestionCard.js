import React from "react";
import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';

const CardCustom = styled(Card)`
  border: none;
  width: 100%;
  min-height: 13rem;
`;

const CardBodyCustom = styled(CardBody)`
  color: black;
  position:'relative';
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const headerStyle = {
  backgroundColor:'#58BC82',
  color:'white',
  position:'absolute',
  right:'0',
  top:'0',
  padding:'.8rem',
  borderRadius:'0 4px 0 5px'
}

class QuestionCardComponent extends React.Component {
  render() {
    return (
      <CardCustom>
        <CardBodyCustom>
          <h5 style={headerStyle}>{this.props.count} of 5</h5>
          {this.props.children}
        </CardBodyCustom>
      </CardCustom>
    )
  }
}

export default QuestionCardComponent;
