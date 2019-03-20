import React from "react";
import axios from 'axios';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import QuestionForm from '../../components/questionForm/QuestionForm';
import ResultsDisplay from '../../components/resultsDisplay/ResultsDisplay';
import GameInfo from './gameInfo';
import QuestionCardComponent from '../../components/cards/QuestionCard';
// import { testingAlbumArray } from './forTesting';

class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        // albumArray: testingAlbumArray, // for testing
        // albumArrayIsLoaded: true, // for testing
        albumArray: null,
        albumArrayIsLoaded: false,

        showDirections: true,
        gameIsStarted: false,
        activeAlbum: null,
        count: 1,
        userGuessArray: [],
        gameIsEnded: false,
        playAgainButton: false,
      };
  }

  componentDidMount = async () => {
    await this.scrapeRollingStone('500AllTime'); // comment out when testing
  }

  scrapeRollingStone = (type) => {
    console.log(type)
    return axios.get(`/scrape/rollingStone/${type}`)
      .then(res => {
        if (res.status === 200) {
          let albumArray = res.data;
          this.setState({
            albumArray: albumArray,
            albumArrayIsLoaded: true
          });
        }
      })
      .catch(err => console.log('err',err));
  }

  handleButtonStart = () => {
    this.setState({
      showDirections: false,
      gameIsStarted: true,
      activeAlbum: this.state.albumArray[this.state.count - 1], // minus 1 bc array starts at 0 but Q's start at 1
      gameIsEnded: false
    })
  }

  handleSubmit = yearInput => {
    this.setState({ showSubmittedNotification: true })
    setTimeout( () => this.guessSubmittedTimer(yearInput), 1500); // show notification for 2 seconds
    // setTimeout( () => this.guessSubmittedTimer(yearInput), 10); // for testing
  }

  guessSubmittedTimer = yearInput => {
    this.state.userGuessArray.push(yearInput);
    let updatedCount = this.state.count + 1;
    if (updatedCount <= 5) {
      this.nextAlbum(updatedCount);
    } else {
      this.endGame();
    }

    this.setState({ showSubmittedNotification: false })
  }

  nextAlbum = (updatedCount) => {
    this.setState({
      activeAlbum: this.state.albumArray[updatedCount - 1],
      count: updatedCount
    })
  }

  endGame = async () => {
    this.setState({
      gameIsEnded: true,
      
      albumArrayIsLoaded: false,
      gameIsStarted: false,
      activeAlbum: null,
      count: 1,
      playAgainButton: true,
    })

    await this.scrapeRollingStone('500AllTime');

    // reset user answers after submitting
    this.setState({
      userGuessArray: []
    })
  }

  render() {
    return (
      <Jumbotron style={{backgroundColor:'var(--color-blue-gray)', paddingTop:'2rem', paddingBottom:'2rem'}}>
        <Container style={{textAlign:'center'}}>
          {this.state.showDirections ? <GameInfo /> : null}
          {this.state.gameIsEnded ? <ResultsDisplay mainState={this.state} /> : null}
          <div style={{margin:'20px auto'}}>
            {!this.state.albumArrayIsLoaded ? <h3>Loading...</h3> : null}
            {this.state.albumArrayIsLoaded && !this.state.gameIsStarted ? <Button size='lg' style={{backgroundColor:'var(--color-dark-green)'}} onClick={this.handleButtonStart}>{this.state.playAgainButton ? 'Play Again' : 'Start Game'}</Button> : null}
            {this.state.gameIsStarted ? 
              <div>
                <Row style={{margin:'0 0 2rem 0'}}>
                  <h4>What year was this album released?</h4>
                  <hr width='100%' style={{border:'.5px solid white'}}></hr>
                </Row>
                <Row>
                  <Col sm='12' md='5' style={{textAlign:'center'}}>
                    <ImgContainer width='80%' height='auto'>
                      <Img src={this.state.activeAlbum.imgUrl} alt='Album Picture' />
                    </ImgContainer>
                    <h4 style={{margin:'10px'}}><strong>{this.state.activeAlbum.artist}</strong>: <em>{this.state.activeAlbum.album}</em></h4>
                  </Col>
                  <Col sm='12' md='7'>
                    <QuestionCardComponent count={this.state.count} classN='cardHeight'>
                      {this.state.showSubmittedNotification ? 
                        <h5>{this.state.count < 5 ? `Submitted! Moving to next question...` : `Submitted! Showing results...`}</h5> :
                        <QuestionForm mainHandleSubmit={this.handleSubmit}/>}
                    </QuestionCardComponent>
                  </Col>
                </Row>
              </div> : null}
            </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default Main;
