import React from 'react';

class ResultsDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    // let { albumArray, userGuessArray } = this.state;
    console.log('mainState',this.props.mainState)
  }
  
  render() {
    return (
      <div>Results</div>
    )
  }
}

// const ResultsDisplay = () => {
//   return (
//     <div>sup</div>
//   )
// }

export default ResultsDisplay;