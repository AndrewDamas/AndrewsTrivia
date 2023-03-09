import { link } from 'fs';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserInfo from '../models/UserInfo';
import { fetchLeaderboard, addUserScoreEasy, addUserScoreMedium, addUserScoreHard } from '../services/Leaderboard';
import '../styles/Leaderboard.css';


export default function Leaderboard() {
  const navigate = useNavigate();
  const[easy, setEasy] = useState<UserInfo[]>([]);
  const[medium, setMedium] = useState<UserInfo[]>([]);
  const[hard, setHard] = useState<UserInfo[]>([]);
  
  const [easyScrollable, setEasyScrollable] = useState<boolean>(true);
  const [mediumScrollable, setMediumScrollable] = useState<boolean>(true);
  const [hardScrollable, setHardScrollable] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  fetchLeaderboard()
    .then(res => {
    setEasy(res.easy);
    setMedium(res.medium);
    setHard(res.hard);
    if(easy.length === 0){
      setEasyScrollable(false);
    } else {
      setEasyScrollable(true);
    }
    if(medium.length === 0){
      setMediumScrollable(false);
    } else {
      setMediumScrollable(true);
    }
    if(hard.length === 0){
      setHardScrollable(false);
    } else {
      setHardScrollable(true);
    }
    setIsLoading(false);
  })

  
  const sortedEasyArray = easy.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const sortedMediumArray = medium.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });
  
  const sortedHardArray = hard.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });


  


  return (
    <div className='Leaderboard'>
      <button onClick={() => {
        navigate('/');
      }}>
        <img src={process.env.PUBLIC_URL + '/images/back.png'} alt="" />
        <p>BACK</p>
      </button>
      <h1>LEADERBOARD</h1>
      <div className='row'>
        <div className={`boards easy-board ${easyScrollable && 'scrollable'}`}>
          <h2>EASY</h2>
            {
              sortedEasyArray.length > 0?
              <ol>
              { 
                sortedEasyArray.map((i, index) => 
                  <li key={index}>
                    <div>
                      <p className='name'>#{index + 1}. {i.name}</p>
                      <p className='date'>{i.date}</p>
                    </div>
                    <p className='score'>{i.score}</p>
                  </li>
                )
              }
              </ol>
              :
              <div className="nothing-yet">
                {
                  isLoading ? 
                  <p>Loading...</p>
                  :
                  <p>Nothing to show yet... Be the first!</p>
                }
              </div>
            }
        </div>
        <div className={`boards medium-board ${mediumScrollable && 'scrollable'}`}>
          <h2>MEDIUM</h2>
            {
              sortedMediumArray.length > 0?
              <ol>
              {
                sortedMediumArray.map((i, index) => 
                  <li key={index}>
                    <div>
                      <p className='name'>#{index + 1}. {i.name}</p>
                      <p className='date'>{i.date}</p>
                    </div>
                    <p className='score'>{i.score}</p>
                  </li>
                )
              }
              </ol>
              :
              <div className="nothing-yet">
                {
                  isLoading ? 
                  <p>Loading...</p>
                  :
                  <p>Nothing to show yet... Be the first!</p>
                }
              </div>
            }
        </div>
        <div className={`boards hard-board ${hardScrollable && 'scrollable'}`}>
          <h2>HARD</h2>
            {
              sortedHardArray.length > 0?
              <ol>
              {
                sortedHardArray.map((i, index) => 
                  <li key={index}>
                    <div>
                      <p className='name'>#{index + 1}. {i.name}</p>
                      <p className='date'>{i.date}</p>
                    </div>
                    <p className='score'>{i.score}</p>
                  </li>
                )
              }
              </ol>
              :
              <div className="nothing-yet">
                {
                  isLoading ? 
                  <p>Loading...</p>
                  :
                  <p>Nothing to show yet... Be the first!</p>
                }
              </div>
            }
        </div>
      </div>
    </div>
  )
}

