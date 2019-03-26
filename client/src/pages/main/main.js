import React from "react";
import axios from 'axios';
import GameComponent from '../../components/game/Game';
import { Jumbotron, Button } from 'reactstrap';
import ResultsDisplay from '../../components/resultsDisplay/ResultsDisplay';
import GameInfo from './gameInfo';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumArray: null,
      albumArrayIsLoaded: false,

      showDirections: true,
      gameIsStarted: false,
      gameIsEnded: false,
      userGuessArray: [],
      playAgainButton: false,
    };
  }

  componentDidMount = async () => {
    await this.scrapeRollingStone('500AllTime');
  }

  scrapeRollingStone = (type) => {
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
      gameIsEnded: false
    });
  }

  endGame = async (userGuessArray) => {
    this.setState({
      gameIsEnded: true,
      
      userGuessArray: userGuessArray,
      albumArrayIsLoaded: false,
      gameIsStarted: false,
      playAgainButton: true,
    });

    await this.scrapeRollingStone('500AllTime');
  }

  render() {
    let directions = this.state.showDirections ? <GameInfo /> : null;
    let results = this.state.gameIsEnded ? <ResultsDisplay mainState={this.state} /> : null;
    let loadingText = !this.state.albumArrayIsLoaded ? <h4>Loading...</h4> : null;
    let startButton = <Button size='lg' style={{backgroundColor:'var(--color-dark-green)', margin:'1rem'}} onClick={this.handleButtonStart}>{this.state.playAgainButton ? 'Play Again' : 'Start Game'}</Button>;
    
    return (
      <Jumbotron style={{backgroundColor:'var(--color-blue-gray)', paddingTop:'2rem', paddingBottom:'2rem'}}>
        {directions}
        {results}
        <div style={{textAlign:'center'}}>
          {(this.state.albumArrayIsLoaded && !this.state.gameIsStarted) ? startButton : loadingText}
          {this.state.gameIsStarted ? <GameComponent albumArray={this.state.albumArray} endGame={this.endGame} /> : null}
        </div>
      </Jumbotron>
    );
  }
}

export default Main;
