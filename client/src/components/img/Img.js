import React from "react";
import styled from 'styled-components';

const StyledImage = styled.img`
  margin: auto;
  width: 100%;
  height: auto;
`;

class Img extends React.Component {  
  render() {
    const { src, alt } = this.props;
    return (
      <StyledImage src={src} alt={alt} />
    );
  }
}

export default Img;


