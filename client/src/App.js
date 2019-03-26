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

class App extends React.Component {
  render() {
    return (
      <Router>
        <Background>
          <NavBar headerText='Guess the Album' toLink='/'/>
          <Container>
            <Switch>
              <Route exact path="/" component={Main} />

              <Route component={NotFound} />
            </Switch>
          </Container>
        </Background>
      </Router>
    )
  }
};

export default App;

