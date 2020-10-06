import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Main from './pages/main';
import NotFound from './pages/notFound';

// components
import NavBar from './components/nav/NavBar';
import Background from './components/background/Background';

// style
import './App.css';
import { Container } from 'reactstrap';

// temporary for reconstruction
import { StyledJumbotron } from './pages/main/main';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Background>
          <NavBar headerText='Guess the Album' toLink='/'/>
          <Container>
            <StyledJumbotron>
              This app is currently under maintenance, due to the data source (rollingstone.com) changing from static to dynamic content. Please check back in soon!
            </StyledJumbotron>

            {/* <Switch>
              <Route exact path="/" component={Main} />

              <Route component={NotFound} />
            </Switch> */}
          </Container>
        </Background>
      </Router>
    )
  }
};

export default App;

