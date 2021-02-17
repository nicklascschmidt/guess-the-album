import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameComponent from '../../components/game/Game';
import { Jumbotron, Button } from 'reactstrap';
import ResultsDisplay from '../../components/resultsDisplay/ResultsDisplay';
import GameInfo from './gameInfo';

export const StyledJumbotron = styled(Jumbotron)`
  background-color: var(--color-blue-gray);
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumArray: null,
      areAlbumsLoaded: false,

      showDirections: true,
      isGameStarted: false,
      isGameEnded: false,
      userGuessArray: [],
      playAgainButton: false,
    };
  }

  componentDidMount = async () => {
    await this.scrapeRollingStone();
  };

  scrapeRollingStone = () => {
    return axios
      .get(`/scrape/rollingStone`)
      .then((res) => {
        if (res.status === 200) {
          const albumArray = res.data;
          this.setState({
            albumArray,
            areAlbumsLoaded: true,
          });
        }
      })
      .catch((err) => console.log('err', err));
  };

  handleButtonStart = () => {
    this.setState({
      showDirections: false,
      isGameStarted: true,
      isGameEnded: false,
    });
  };

  handleEndGame = async (userGuessArray) => {
    this.setState({
      isGameEnded: true,

      userGuessArray: userGuessArray,
      areAlbumsLoaded: false,
      isGameStarted: false,
      playAgainButton: true,
    });

    await this.scrapeRollingStone();
  };

  render() {
    const { albumArray, showDirections, isGameStarted, isGameEnded, areAlbumsLoaded, playAgainButton } = this.state;
    const directions = showDirections ? <GameInfo /> : null;
    const results = isGameEnded ? <ResultsDisplay mainState={this.state} /> : null;
    const loadingText = !areAlbumsLoaded ? <h4>Loading...</h4> : null;
    const startButton = (
      <Button
        size='lg'
        style={{ backgroundColor: 'var(--color-dark-green)', margin: '1rem' }}
        onClick={this.handleButtonStart}
      >
        {playAgainButton ? 'Play Again' : 'Start Game'}
      </Button>
    );

    return (
      <StyledJumbotron>
        {directions}
        {results}
        <div style={{ textAlign: 'center' }}>
          {areAlbumsLoaded && !isGameStarted ? startButton : loadingText}
          {isGameStarted ? (
            <GameComponent
              albumArray={albumArray}
              handleEndGame={this.handleEndGame}
            />
          ) : null}
        </div>
      </StyledJumbotron>
    );
  }
}

export default Main;
