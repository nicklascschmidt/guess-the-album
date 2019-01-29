
import React from "react";
import moment from 'moment';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';

class QuestionForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        min: 1950,
        max: parseInt(moment().format('YYYY')),
        formInputRange: 0,
      };
  }

  componentDidMount = () => {
    this.setState({
      formInputRange: Math.round((this.state.max + this.state.min) / 2)
    });
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.mainHandleSubmit(this.state.formInputRange);
  }

  handleSliderChange = event => {
    let { id, value } = event.target;
    this.setState({
      [id]: parseInt(value)
    });
  }


  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="formInputRange">Your Guess: {this.state.formInputRange}</Label>
          <input type='range' id="formInputRange" min={this.state.min} max={this.state.max} value={this.state.formInputRange} onChange={event => this.handleSliderChange(event)}/>
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleSubmit}>Guess!</Button>
        </FormGroup>
        {/* <FormText color="muted">
          *submit will open external default mail client
        </FormText> */}
      </Form>
    );
  }
}

export default QuestionForm;
