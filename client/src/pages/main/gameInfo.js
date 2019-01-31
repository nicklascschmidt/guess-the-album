import React from 'react';
import CardComponent from '../../components/cards/Card';

const GameInfo = () => {
  return (
      <div>
        <CardComponent header='About' width='30%' margin='10px' textAlign='left'>
          <p>This is a music trivia game that will test your knowledge of popular albums released during the latter half of the 20th century up until today.</p>
          <p>Albums are pulled from the <a href='https://rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/' target='_blank' rel='noopener noreferrer'>Rolling Stone's Greatest 500 Albums List</a>.</p>
        </CardComponent>
        <CardComponent header='Instructions' width='30%' margin='10px' textAlign='left'>
          <ul>
            <li>Click the Start Game button.</li>
            <li>Look at the album and think about what year it was made.</li>
            <li>Move the slider to adjust your guess.</li>
            <li>Submit and move on (5 Q's in total).</li>
            <li>View results and play again!</li>
          </ul>
        </CardComponent>
        <CardComponent header='Scoring' width='30%' margin='10px' textAlign='left'>
          <p>Your round score is the absolute value of the difference between your guess and the album's actual release year.</p>
          <p>Your total score is the sum of all 5 rounds.</p>
          <p>The lower the score, the better!</p>
        </CardComponent>
      </div>
  )
}

export default GameInfo;