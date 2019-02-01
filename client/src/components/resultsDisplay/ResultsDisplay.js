import React from 'react';
import Img from '../img/Img';
import ImgContainer from '../img/ImgContainer';
import { Table } from 'reactstrap';
import styled from 'styled-components';

const ScoreCustom = styled.h3`
  margin: 0 auto 20px auto;
  border: 5px solid var(--color-dark-green);
  border-radius: 10px;
  background-color: var(--color-dark-purple);
  padding: 10px;
  width: fit-content;
`;

class ResultsDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      albumArray: []
    }
  }

  componentDidMount() {
    let { albumArray, userGuessArray } = this.props.mainState;
    this.setState({
      albumArray,
      userGuessArray,
      resultsAreReady: true,
    }, () => console.log('this.state',this.state))
    
  }

  calculateRoundScore = (yearInput, yearActual) => {
    let yearDiff = Math.abs(yearInput - yearActual);
    return yearDiff
  }

  calculateTotalScore = () => {
    let totalScore = 0;
    this.state.albumArray.forEach( (album,i) => {
      let roundScore = this.calculateRoundScore(this.state.userGuessArray[i],album.year)
      totalScore = totalScore + roundScore;
    })
    return totalScore
  }

  showTableContents = () => {
    let rows = this.state.albumArray.map( (album, i) => {
      let roundScore = this.calculateRoundScore(this.state.userGuessArray[i],album.year)
      return (
        <tr key={i}>
          {/* <th scope="row">{i + 1}</th> */}
          <td style={{verticalAlign:'middle'}}>
            <ImgContainer width='100px' height='100px'>
              <Img src={album.imgUrl} alt='Album Picture' />
            </ImgContainer>
          </td>
          <td style={{verticalAlign:'middle'}}>{this.state.userGuessArray[i]}</td>
          <td style={{verticalAlign:'middle'}}>{album.year}</td>
          <td style={{verticalAlign:'middle'}}>{roundScore}</td>
        </tr>
      )
    })
    return <tbody>{rows}</tbody>
  }
  
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <ScoreCustom>Score: <strong>{this.state.resultsAreReady ? this.calculateTotalScore() : null}</strong></ScoreCustom>
        <Table striped style={{backgroundColor: 'var(--color-purple-gray)', paddingTop: '10px', marginBottom: '20px', borderRadius: '5px'}}>
          <thead>
            <tr>
              {/* <th>Question #</th> */}
              <th>Album</th>
              <th>Your Guess</th>
              <th>Actual Year</th>
              <th>Difference</th>
            </tr>
          </thead>
          {this.state.resultsAreReady ? this.showTableContents() : null}
        </Table>
      </div>
    )
  }
}

export default ResultsDisplay;
