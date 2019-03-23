import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Img from '../img/Img';
import ImgContainer from '../img/ImgContainer';
import QuestionForm from '../questionForm/QuestionForm';
import QuestionCardComponent from '../cards/QuestionCard';

// end game --> count = 1

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

  // When user hits submit-- show a submission notification, push the guess into the array, update the count.
  handleSubmit = yearInput => {
    this.state.userGuessArray.push(yearInput);
    this.moveToNextAlbum(this.state.count);

    this.setState({ showSubmittedNotification: true });
    setTimeout( () => this.stopGuessSubmittedTimer(), 15); // show notification for 1.5 seconds
  }


  stopGuessSubmittedTimer = () => {
    this.setState({ showSubmittedNotification: false })
  }

  moveToNextAlbum = (count) => {
    console.log('count',count)
    if (count+1 <= 5) {
      this.setState({
        activeAlbum: this.state.albumArray[count],
        count: count+1
      });
    } else {
      console.log('ending game!');
      this.props.endGameMain(this.state.userGuessArray);
    }
  }


  render() {
    console.log('this.state',this.state);
    return (
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
      </div>
    )
  }
}

export default GameComponent;
