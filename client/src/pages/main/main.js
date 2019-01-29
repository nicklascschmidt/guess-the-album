import React from "react";
import axios from 'axios';
import CardComponent from '../../components/cards/Card';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
// import { , Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import QuestionForm from '../../components/questionForm/QuestionForm';
import ResultsDisplay from '../../components/resultsDisplay/resultsDisplay';

class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        albumArray: [ // for testing
          { album: 'Achtung Baby',
            artist: 'U2',
            year: 1991,
            imgUrl:
            'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136852-05c62e826eb9c0ef8fbf3e4e2d807a355efb0c94.jpg?crop=1240:1240&width=300' },
          { album: 'The Bends',
            artist: 'Radiohead',
            year: 1995,
            imgUrl:
            'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136922-ade473553eca8fd0931d1267c4c5304e1b7b2b91.jpg?crop=1240:1240&width=300' },
          { album: 'In Color',
            artist: 'Cheap Trick',
            year: 1977,
            imgUrl:
            'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-cheap-trick-in-color-1ef4f243-d005-412e-810f-9cdad233af2a.jpg?crop=1240:1240&width=300' },
          { album: 'The Best of Girl Groups Volumes 1 and 2',
            artist: 'Various Artists',
            year: 1990,
            imgUrl:
            'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136716-cbbaa618e1a73ecb8c1a8e4cfdaef83d56cdcb39.jpg?crop=1240:1240&width=300' },
          { album: 'What’s Going On',
            artist: 'Marvin Gaye',
            year: 1971,
            imgUrl:
            'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136795-89f4e4079e43af44a80043f496eebfc562e3c9ec.jpg?crop=1240:1240&width=300' }
        ],
        // albumArray: null,
        albumArrayIsLoaded: false,
        gameIsStarted: false,
        activeAlbum: null,
        count: 1,
        userGuessArray: [],
        userScore: 0,
        gameIsEnded: false,
        restartButton: false,
      };
  }

  componentDidMount = async () => {
    await this.scrapeRollingStone();
    console.log('this.state',this.state);
  }

  scrapeRollingStone = () => {
    return this.setState({
      albumArrayIsLoaded: true
    });
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
      gameIsStarted: true,
      activeAlbum: this.state.albumArray[this.state.count - 1], // minus 1 bc array starts at 0 but Q's start at 1
      gameIsEnded: false
    })
  }
  
  wait = () => {
    // setTimeout(this.wait, 1000);
    console.log('this.state',this.state);
  }

  handleSubmit = yearInput => {
    this.state.userGuessArray.push(yearInput);
    this.calculateScore(yearInput,this.state.activeAlbum.year);
    let updatedCount = this.state.count + 1;
    if (updatedCount <= 5) {
      this.nextAlbum(updatedCount);
    } else {
      this.endGame();
    }
  }

  calculateScore = (yearInput, yearActual) => {
    let yearDiff = Math.abs(yearInput - yearActual);
    this.setState({
      userScore: this.state.userScore + yearDiff
    })
  }

  nextAlbum = (updatedCount) => {
    this.setState({
      activeAlbum: this.state.albumArray[updatedCount - 1],
      count: updatedCount
    })
  }

  endGame = async () => {
    console.log('END GAME');
    this.setState({
      gameIsEnded: true,
      
      // albumArray: null,
      albumArrayIsLoaded: false,
      gameIsStarted: false,
      activeAlbum: null,
      count: 1,
      restartButton: true,
    })

    await this.scrapeRollingStone();

    // reset user answers after submitting
    this.setState({
      userGuessArray: [],
      userScore: 0,
    })
  }

  render() {
    return (
      <div>
        <Jumbotron style={{backgroundColor: '#C9716B'}}>
          <Container style={{textAlign:'center'}}>
            {this.state.gameIsEnded ? <ResultsDisplay mainState={this.state} /> : null}
            {!this.state.albumArrayIsLoaded ?
            <h3>Loading...</h3> :
              !this.state.gameIsStarted ?
              <Button onClick={this.handleButtonStart}>{this.state.restartButton ? 'Restart' : 'Start'}</Button> :
              <Row>
                <Col sm='12' md='6' style={{textAlign:'center'}}>
                  <h5>{this.state.activeAlbum.artist}: {this.state.activeAlbum.album}</h5>
                  <ImgContainer width='300px' height='300px'>
                    <Img src={this.state.activeAlbum.imgUrl} alt='Album Picture' />
                  </ImgContainer>
                </Col>
                <Col sm='12' md='6'>
                  <CardComponent header={`Question ${this.state.count} of 5`}>
                    <p>What year was this album released?</p>
                    <QuestionForm mainHandleSubmit={this.handleSubmit}/>
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
