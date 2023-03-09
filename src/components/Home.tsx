import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
import "../styles/Home.css";

export default function Home() {
    const{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty} = useContext(PlayerContext);

    const navigate = useNavigate();
  return (
    <div id='Home'>
        <div id="home-title">
            <h1>ANDREW'S</h1>
            <h1>TRIVIA</h1>
        </div>
        <button id='play-game' onClick={() => {
            resetScore();
            resetHearts();
            navigate('/category_spin_wheel');
        }}>
            <p>PLAY GAME</p>
        </button>
        {
            difficulty === "easy"?
            <button id='difficulty-button' className='set-easy' onClick={() => {resetDifficulty("medium")}}>
                <p>DIFFICULTY: EASY</p>
            </button>
            : difficulty === "medium"?
            <button id='difficulty-button' className='set-medium' onClick={() => resetDifficulty("hard")}>
                <p>DIFFICULTY: MEDIUM</p>
            </button>
            :
            <button id='difficulty-button' className='set-hard' onClick={() => resetDifficulty("easy")}>
                <p>DIFFICULTY: HARD</p>
            </button>
        }
        <button id='leaderboard-button' onClick={() => navigate('/leaderboard')}>
            <p>LEADERBOARD</p>
        </button>
        <button id='rules-button' onClick={() => {
            navigate('/rules');
        }}>
            <p>HOW TO PLAY</p>
        </button>
    </div>
  )
}
