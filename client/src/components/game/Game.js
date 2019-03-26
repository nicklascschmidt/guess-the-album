import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Img from '../img/Img';
import ImgContainer from '../img/ImgContainer';
import QuestionForm from '../questionForm/QuestionForm';
import QuestionCardComponent from '../cards/QuestionCard';

export class GameComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumArray: this.props.albumArray,
      activeAlbum: this.props.albumArray[0],
      count: 1,
      userGuessArray: [],
      showSubmittedNotification: false,
    };
  }

  // When user hits submit-- push the guess into the array && show a submission notification.
  handleSubmit = (yearInput) => {
    this.state.userGuessArray.push(yearInput);

    // Show notification for 1.5 seconds.
    this.setState({ showSubmittedNotification: true });
    this.submitUserGuessOnTimer(1500);
  }

  // When timer expires, switch the album and remove the notification.
  submitUserGuessOnTimer = (time) => {
    setTimeout( () => {
      this.setState({ showSubmittedNotification: false })
      this.moveToNextAlbum(this.state.count);
    }, time);
  }

  // If before question #5, move to the next album. Else end the game.
  moveToNextAlbum = (count) => {
    if (count < 5) {
      this.setState({
        activeAlbum: this.state.albumArray[count],
        count: count+1,
      });
    } else {
      this.props.endGame(this.state.userGuessArray);
    }
  }

  render() {
    return (
      <div>
        <h4>What year was this album released?</h4>
        <hr width='100%' style={{border:'none', height:'1px', backgroundColor:'white', marginBottom:'2rem'}}></hr>
        <Row>
          <Col sm='12' md='5' style={{textAlign:'center'}}>
            <ImgContainer width='80%' height='auto'>
              <Img src={this.state.activeAlbum.imgUrl} alt='Album Picture' />
            </ImgContainer>
            <h4 style={{margin:'1rem'}}><strong>{this.state.activeAlbum.artist}</strong>: <em>{this.state.activeAlbum.album}</em></h4>
          </Col>
          <Col sm='12' md='7'>
            <QuestionCardComponent count={this.state.count}>
              {this.state.showSubmittedNotification ? 
                <h5>{this.state.count < 5 ? `Submitted! Moving to next question...` : `Submitted! Showing results...`}</h5> :
                <QuestionForm mainHandleSubmit={this.handleSubmit}/>}
            </QuestionCardComponent>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GameComponent;
