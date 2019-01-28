import React from "react";
import JumbotronComponent from '../../components/jumbotron/Jumbotron';
import CardComponent from '../../components/cards/Card';
import { Container, Jumbotron } from 'reactstrap';
import Img from '../../components/img/Img';
import ImgContainer from '../../components/img/ImgContainer';


class Main extends React.Component {
  constructor(props) {
      super(props);

      this.state = {

      };
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <ImgContainer width='300px' height='300px'>
            <Img src='https://www.rollingstone.com/wp-content/uploads/2018/06/rs-136815-cbb03ec26a73d7619600851e27bddf3511abf4de.jpg?crop=1240:1240&width=300' alt='Profile Picture' />
          </ImgContainer>
          <CardComponent header='About'>
            <p>
              My name is Nicklas Chen Schmidt, and I’m a full stack developer seeking opportunities in the Bay Area. I’m passionate about building and improving web applications, as well as solving puzzles, learning new concepts, and translating ideas into real world applications.
            </p>
          </CardComponent>
        </Jumbotron>
      </div>
    );
  }
}

export default Main;
