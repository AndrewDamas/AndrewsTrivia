import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Rules.css";

export default function Rules() {
  const navigate = useNavigate();
  return (
    <div className='Rules'>
      <button onClick={() => {
        navigate('/');
      }}>
        <img src={process.env.PUBLIC_URL + '/images/back.png'} alt="back-button" />
        <p>BACK</p>
      </button>
      <h1>HOW TO PLAY</h1>
      <p>In this trivia game, players start with 3 hearts. To begin, players spin the Category Spin Wheel, which determines the category for the question they will be asked. Questions are based on a range of topics and difficulty levels, so players will need to use their knowledge and critical thinking skills to succeed. Each question must be answered within a set time limit of 20 seconds, and if players get the question right, they will earn 100 points.</p>
      <p>However, if players get the question wrong, or if they fail to answer within the 20-second time limit, they will lose a heart and receive no points. Losing all three hearts will result in the game being over, and players will need to start again from the beginning. To progress through the game, players must answer as many questions correctly as possible, earning points and avoiding losing hearts.
      </p>
      <p>To add an extra level of challenge, for each game players can choose between three different difficulty levels: easy, medium, or hard. Each difficulty level features questions of increasing difficulty, so players will need to adjust their knowledge base accordingly. Whether you're a seasoned trivia buff or just looking for a fun way to test your knowledge, this game has something for everyone. So spin that wheel, answer those questions, and see how high you can climb on the leaderboard!
      </p>
    </div>
  )
}
