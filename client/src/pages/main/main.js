import React from "react";
import axios from 'axios';
import CardComponent from '../../components/cards/Card';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';
import { Container, Jumbotron, Row, Col, Button } from 'reactstrap';
// import { , Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import QuestionForm from '../../components/questionForm/QuestionForm';


class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        albumArray: null,
        albumArrayIsLoaded: false,
        gameIsStarted: false,
        activeAlbum: null,
        count: 0
      };
  }

  componentDidMount = async () => {
    await this.scrapeRollingStone();
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
      gameIsStarted: true,
      activeAlbum: this.state.albumArray[this.state.count],
      count: this.state.count + 1
    })
    setTimeout(this.wait, 2000);
  }
  
  wait = () => {
    console.log('this.state',this.state);
  }


  render() {
    return (
      <div>
        <Jumbotron style={{backgroundColor: '#C9716B'}}>
          <Container>
            {!this.state.albumArrayIsLoaded ?
            <h3>Loading...</h3> :
              !this.state.gameIsStarted ?
              <Button onClick={this.handleButtonStart}>Start</Button> :
              <Row>
                <Col sm='12' md='6'>
                  <ImgContainer width='300px' height='300px'>
                    <Img src={this.state.activeAlbum.imgUrl} alt='Album Picture' />
                  </ImgContainer>
                </Col>
                <Col sm='12' md='6'>
                  <CardComponent header={`Question ${this.state.count} of 5`}>
                    <p>What year was this album released?</p>
                    <QuestionForm />
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
