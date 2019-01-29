import React from "react";
import styled from 'styled-components';

const ImageContainer = styled.div`
  border: 2px solid darkred;
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '200px'};
  position: relative;
  overflow: hidden;
  border-radius: 2%;
  margin: auto;
`;

class ImgContainer extends React.Component {  
  render() {
    return (
      <ImageContainer width={this.props.width} height={this.props.height}>
        {this.props.children}
      </ImageContainer>
    );
  }
}

export default ImgContainer;


