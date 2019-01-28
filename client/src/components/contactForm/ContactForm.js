import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ContactForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        submitterSubject: '',
        submitterMessage: '',
        mailTo: 'mailto',
        emailName: 'nicklas.c.schmidt.fwd',
        emailDomain: 'gmail.com',
        completeMailTo: null,
      };
  }

  componentDidMount = () => {
    this.setState({
      completeMailTo: this.state.hiddenMailTo
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { mailTo, emailName, emailDomain, submitterSubject, submitterMessage } = this.state;
    this.setState({
      completeMailTo: `${mailTo}:${emailName}@${emailDomain}?subject=${submitterSubject}&body=${submitterMessage}`
    }, () => {    
      window.location.href = this.state.completeMailTo;
    });
  }


  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="formSubject">Subject</Label>
          <Input type="text" name="submitterSubject" id="formSubject" placeholder="subject..." value={this.state.submitterSubject} onChange={event => this.handleChange(event)} />
        </FormGroup>
        <FormGroup>
          <Label for="formMessage">Message</Label>
          <Input type="textarea" name="submitterMessage" id="formMessage" placeholder="message..." value={this.state.submitterMessage} onChange={event => this.handleChange(event)} />
        </FormGroup>
        {/* <a href={this.state.completeMailTo}> */}
          <Button style={{backgroundColor: '#74AA6F', borderColor: '#74AA6F'}} onClick={this.handleSubmit}><strong>Submit*</strong></Button>
        {/* </a> */}
        <FormText color="muted">
          *submit will open external default mail client
        </FormText>
      </Form>
    );
  }
}

export default ContactForm;
