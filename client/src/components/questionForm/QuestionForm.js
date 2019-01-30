
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
        error: {
          isError: false,
          errorMsg: null
        },
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
    // only handle submit if the user adjusted the slider
    if (this.state.sliderHasMoved) {
      this.props.mainHandleSubmit(this.state.rangeInputValue);
      this.setState({
        sliderHasMoved: false,
        rangeInputValue: Math.round((this.state.max + this.state.min) / 2)
      });
    } else {
      this.setState({
        error: {
          isError: true,
          errorMsg: `Move the slider first!`
        }
      })
    }
  }

  handleSliderChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
      sliderHasMoved: true,
      error: {
        isError: false,
        errorMsg: null
      }
    });
  }


  render() {
    return (
      <Form>
        <FormGroup>
          {/* <Label for="formInputRange">{this.state.sliderHasMoved ? `Your Guess: ${this.state.rangeInputValue}` : `Drag the slider to adjust your guess`}</Label> */}
          {this.state.sliderHasMoved ? <Label for="formInputRange">Your Guess: {this.state.rangeInputValue}</Label> : <FormText>Drag the slider to adjust your guess</FormText>}
          <input type='range' id="formInputRange" name='rangeInputValue' min={this.state.min} max={this.state.max} value={this.state.rangeInputValue} onChange={event => this.handleSliderChange(event)}/>
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleSubmit}>Guess!</Button>
        </FormGroup>
        {this.state.error.isError ? <p style={{color:'red'}}>{this.state.error.errorMsg}</p> : null}
      </Form>
    );
  }
}

export default QuestionForm;
