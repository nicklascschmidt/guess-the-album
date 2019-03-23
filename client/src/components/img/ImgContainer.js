import React from "react";
import styled from 'styled-components';

const ImageContainer = styled.div`
  border: 1px solid var(--color-dark-purple);
  width: ${props => props.width || '20rem'};
  height: ${props => props.height || '20rem'};
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


