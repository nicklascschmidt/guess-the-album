import React from 'react';
import Img from '../img/Img';
import ImgContainer from '../img/ImgContainer';
import { Table } from 'reactstrap';

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
          <th scope="row">{i + 1}</th>
          <td>
            <ImgContainer width='100px' height='100px'>
              <Img src={album.imgUrl} alt='Album Picture' />
            </ImgContainer>
          </td>
          <td>{this.state.userGuessArray[i]}</td>
          <td>{album.year}</td>
          <td>{roundScore}</td>
        </tr>
      )
    })
    return <tbody>{rows}</tbody>
  }
  
  render() {
    return (
      <div style={{backgroundColor: '#D8A3A2', paddingTop: '10px', marginBottom: '20px', borderRadius: '5px'}}>
        <h3>Score: {this.state.resultsAreReady ? this.calculateTotalScore() : null}</h3>
        <Table striped>
          <thead>
            <tr>
              <th>Question #</th>
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