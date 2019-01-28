import styled from 'styled-components';
import pattern from './light-veneer.png';

const Background = styled.div`
  background: url(${pattern}) repeat;
  min-height: 100vh;
  overflow-y: scroll;
`;

export default Background;

