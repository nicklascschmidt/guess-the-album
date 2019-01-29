import React from "react";
import CardComponent from '../../components/cards/Card';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import axios from 'axios';



class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {

      };
  }

  componentDidMount() {
    this.scrapeRollingStone();
  }

  scrapeRollingStone = () => {
    // start @ page 10 then decrement till 1
    
    // axios.get(`https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/?list_page=10`)
    axios.get(`/scrape/rollingStone`)
      .then(res => {
        console.log('res',res)
        // const persons = res.data;
        // this.setState({ persons });
      })
      .catch(err => console.log('err',err));
  }

  render() {
    return (
      <div>
        <Jumbotron style={{backgroundColor: '#C9716B'}}>
          <Container>
            <Row>
              <Col sm='12' md='6'>
                <ImgContainer width='300px' height='300px'>
                  <Img src='https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136815-cbb03ec26a73d7619600851e27bddf3511abf4de.jpg?crop=1240:1240&width=300' alt='Profile Picture' />
                </ImgContainer>
              </Col>
              <Col sm='12' md='6'>
                <CardComponent header='About'>
                  <p>
                    My name is Nicklas Chen Schmidt, and I’m a full stack developer seeking opportunities in the Bay Area. I’m passionate about building and improving web applications, as well as solving puzzles, learning new concepts, and translating ideas into real world applications.
                  </p>
                </CardComponent>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Main;
