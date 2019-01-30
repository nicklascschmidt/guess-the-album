
import React from "react";
import moment from 'moment';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';

class QuestionForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        min: 1950,
        max: parseInt(moment().format('YYYY')),
        rangeInputValue: 0,
        sliderHasMoved: false,
      };
  }

  componentDidMount = () => {
    this.setState({
      rangeInputValue: Math.round((this.state.max + this.state.min) / 2)
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
    this.props.mainHandleSubmit(this.state.rangeInputValue);
    this.setState({
      sliderHasMoved: false,
      rangeInputValue: Math.round((this.state.max + this.state.min) / 2)
    });
  }

  handleSliderChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
      sliderHasMoved: true,
    });
  }


  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="formInputRange">{this.state.sliderHasMoved ? `Your Guess: ${this.state.rangeInputValue}` : `Drag the slider to adjust your guess`}</Label>
          <input type='range' id="formInputRange" name='rangeInputValue' min={this.state.min} max={this.state.max} value={this.state.rangeInputValue} onChange={event => this.handleSliderChange(event)}/>
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
