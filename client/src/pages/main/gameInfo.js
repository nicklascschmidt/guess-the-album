import React from 'react';
import InfoCardComponent from '../../components/cards/InfoCard';
import { Row, Col } from 'reactstrap';

const GameInfo = () => {
  return (
    <Row>
      <Col md='6' lg='4'>
        <InfoCardComponent header='About'>
          <p>
            This is a music trivia game that will test your knowledge of popular
            albums released during the latter half of the 20th century up until
            today.
          </p>
          <p>
            Albums are pulled from the{' '}
            <a
              href='https://rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Rolling Stone's Greatest 500 Albums List
            </a>
            .
          </p>
        </InfoCardComponent>
      </Col>
      <Col md='6' lg='4'>
        <InfoCardComponent header='Instructions'>
          <ul>
            <li>Click the Start Game button.</li>
            <li>Look at the album and think about what year it was made.</li>
            <li>Move the slider to adjust your guess.</li>
            <li>Submit and move on (5 Q's in total).</li>
            <li>View results and play again!</li>
          </ul>
        </InfoCardComponent>
      </Col>
      <Col md='6' lg='4'>
        <InfoCardComponent header='Scoring'>
          <p>
            Your round score is the absolute value of the difference between
            your guess and the album's actual release year.
          </p>
          <p>Your total score is the sum of all 5 rounds.</p>
          <p>The lower the score, the better!</p>
        </InfoCardComponent>
      </Col>
    </Row>
  );
};

export default GameInfo;
