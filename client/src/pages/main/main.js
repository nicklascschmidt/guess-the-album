import React from "react";
import axios from 'axios';
import CardComponent from '../../components/cards/Card';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
import QuestionForm from '../../components/questionForm/QuestionForm';
import ResultsDisplay from '../../components/resultsDisplay/resultsDisplay';
import GameInfo from './gameInfo';
import { testingAlbumArray } from './forTesting';

class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        albumArray: testingAlbumArray, // for testing
        albumArrayIsLoaded: true, // for testing

        // albumArray: null,
        // albumArrayIsLoaded: false,
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
    // await this.scrapeRollingStone(); // comment out when testing
    console.log('this.state',this.state);
  }

  scrapeRollingStone = () => {
    return axios.get(`/scrape/rollingStone`)
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
    // setTimeout( () => this.guessSubmittedTimer(yearInput), 2000); // show notification for 2 seconds
    setTimeout( () => this.guessSubmittedTimer(yearInput), 100); // for testing
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

    await this.scrapeRollingStone();

    // reset user answers after submitting
    this.setState({
      userGuessArray: []
    })
  }

  render() {
    return (
      <div>
        <Jumbotron style={{backgroundColor: '#C9716B'}}>
          <Container style={{textAlign:'center'}}>
            {this.state.showDirections ? <GameInfo /> : null}
            {this.state.gameIsEnded ? <ResultsDisplay mainState={this.state} /> : null}
            {!this.state.albumArrayIsLoaded ?
              <h3>Loading...</h3> :
              !this.state.gameIsStarted ?
                <Button style={{margin:'20px auto'}} onClick={this.handleButtonStart}>{this.state.playAgainButton ? 'Play Again' : 'Start Game'}</Button> :
                <Row>
                  <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                    <h4 style={{margin:'0 0 20px 0'}}>What year was this album released?</h4>
                  </Col>
                  <Col sm='12' md='5' style={{textAlign:'center'}}>
                    <ImgContainer width='80%' height='auto'>
                      <Img src={this.state.activeAlbum.imgUrl} alt='Album Picture' />
                    </ImgContainer>
                    <h5 style={{margin:'10px'}}>{this.state.activeAlbum.artist}: <em>{this.state.activeAlbum.album}</em></h5>
                  </Col>
                  <Col sm='12' md='7'>
                    <CardComponent header={`Question ${this.state.count} of 5`}>
                      {this.state.showSubmittedNotification ? <h5>Submitted! Moving to next question...</h5> : <QuestionForm mainHandleSubmit={this.handleSubmit}/>}
                    </CardComponent>
                  </Col>
                </Row>
            }
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Main;
