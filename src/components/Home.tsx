import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import "../styles/Home.css";

export default function Home() {
    const[difficulty, setDifficulty] = useState("easy");
    const navigate = useNavigate();
  return (
    <div id='Home'>
        <div id="home-title">
            <h1>ANDREW'S</h1>
            <h1>TRIVIA</h1>
        </div>
        <button id='play-game' onClick={() => {
            navigate('/category_spin_wheel')
        }}>
            <p>PLAY GAME</p>
        </button>
        {
            difficulty === "easy"?
            <button id='difficulty-button' className='set-easy' onClick={() => setDifficulty("medium")}>
                <p>DIFFICULTY: EASY</p>
            </button>
            : difficulty === "medium"?
            <button id='difficulty-button' className='set-medium' onClick={() => setDifficulty("hard")}>
                <p>DIFFICULTY: MEDIUM</p>
            </button>
            :
            <button id='difficulty-button' className='set-hard' onClick={() => setDifficulty("easy")}>
                <p>DIFFICULTY: HARD</p>
            </button>
        }
        <button id='leaderboard-button'>
            <p>LEADERBOARD</p>
        </button>
        <button id='rules-button'>
            <p>HOW TO PLAY</p>
        </button>
    </div>
  )
}
