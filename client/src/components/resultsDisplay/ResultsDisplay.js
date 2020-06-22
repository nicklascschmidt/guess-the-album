import React from 'react';
import Img from '../img/Img';
import ImgContainer from '../img/ImgContainer';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { FaRegGrinStars, FaRegSmileBeam, FaRegSmile, FaRegMeh, FaRegFrown, FaRegDizzy } from "react-icons/fa";

const Container = styled.div`
  text-align: center;
`;

const ScoreCustom = styled.h3`
  margin: 0 auto 20px auto;
  border: 5px solid var(--color-dark-green);
  border-radius: 10px;
  background-color: var(--color-dark-purple);
  padding: 20px;
  width: fit-content;
`;

const StyledTable = styled(Table)`
  background-color: var(--color-purple-gray);
  color: white;
  padding-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

class ResultsDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      albumArray: []
    }
  }

  componentDidMount() {
    const { albumArray, userGuessArray } = this.props.mainState;
    const totalScore = this.calculateTotalScore(albumArray,userGuessArray);
    const emoji = this.showEmoji(totalScore);
    this.setState({ totalScore, emoji, albumArray, userGuessArray, resultsAreReady: true });
  }

  calculateRoundScore = (yearInput, yearActual, isAbs) => {
    const yearDiff = isAbs ? Math.abs(yearInput - yearActual) : yearInput - yearActual;
    return yearDiff
  }

  calculateTotalScore = (albumArray,userGuessArray) => {
    let totalScore = 0;
    albumArray.forEach( (album,i) => {
      const roundScore = this.calculateRoundScore(userGuessArray[i],album.year,true);
      totalScore = totalScore + roundScore;
    })
    return totalScore
  }

  showEmoji = totalScore => {
    if (totalScore < 1) {
      return <FaRegGrinStars />
    } else if (totalScore <= 10) {
      return <FaRegSmileBeam />
    } else if (totalScore <= 30) {
      return <FaRegSmile />
    } else if (totalScore <= 60) {
      return <FaRegMeh />
    } else if (totalScore <= 100) {
      return <FaRegFrown />
    } else if (totalScore > 100) {
      return <FaRegDizzy />
    } else {
      return // nothing
    }
  }

  showTableContents = (albumArray,userGuessArray) => {
    const rows = albumArray.map( (album, i) => {
      const roundScore = this.calculateRoundScore(userGuessArray[i],album.year,false);
      const roundScoreSign = (roundScore === 0) ? roundScore : (roundScore > 0) ? `+${roundScore}` : `${roundScore}`;
      return (
        <tr key={i}>
          <td style={{verticalAlign:'middle'}}>
            <ImgContainer width='100px' height='100px'>
              <Img src={album.imgUrl} alt='Album Picture' />
            </ImgContainer>
          </td>
          <td style={{verticalAlign:'middle'}}>{userGuessArray[i]}</td>
          <td style={{verticalAlign:'middle'}}>{album.year}</td>
          <td style={{verticalAlign:'middle'}}>{roundScoreSign}</td>
        </tr>
      )
    })
    return <tbody>{rows}</tbody>
  }
  
  render() {
    return (
      <Container>
        <ScoreCustom>Score: <strong>{this.state.totalScore}</strong> {this.state.emoji}</ScoreCustom>
        <StyledTable striped>
          <thead>
            <tr>
              <th>Album</th>
              <th>Your Guess</th>
              <th>Actual Year</th>
              <th>Difference</th>
            </tr>
          </thead>
          {this.state.resultsAreReady ? this.showTableContents(this.state.albumArray,this.state.userGuessArray) : null}
        </StyledTable>
      </Container>
    )
  }
}

export default ResultsDisplay;
