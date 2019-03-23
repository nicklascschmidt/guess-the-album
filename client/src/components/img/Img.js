import React from "react";
import styled from 'styled-components';

const ImgCustom = styled.img`
  margin: auto;
  width: 100%;
  height: auto;
`;

class Img extends React.Component {  
  render() {
    return (
      <ImgCustom src={this.props.src} alt={this.props.alt} />
    );
  }
}

export default Img;


