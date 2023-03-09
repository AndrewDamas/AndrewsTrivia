import UserInfo from "../models/UserInfo";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
import { Leaderboard } from '../models/UserInfo';
import { addUserScoreEasy, addUserScoreHard, addUserScoreMedium, fetchLeaderboard } from '../services/Leaderboard';
import '../styles/GameOver.css';

export default function GameOver() {
    const{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty} = useContext(PlayerContext);
    const navigate = useNavigate();
    const newGame = () => {
        resetHearts();
        resetScore();
    }
    const [name, setName] = useState<string>("");
    const [leaderboard, setLeaderboard] = useState<Leaderboard>();
    const [seeRank, setSeeRank] = useState<boolean>(false);

    const [easy, setEasy] = useState<UserInfo[]>();
    const [medium, setMedium] = useState<UserInfo[]>();
    const [hard, setHard] = useState<UserInfo[]>();
    const [theUser, setTheUser] = useState<UserInfo>({name: "", score: 0, date: ""});

    const pushAndSort = (diff: string, user: UserInfo) => {
        if(diff === "easy") {
            easy?.push(user)
            easy?.sort((a,b) => {
                if (a.score !== b.score) {
                    return b.score - a.score;
                } else {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
            })
        } if(diff === "medium") {
            medium?.push(user)
            medium?.sort((a,b) => {
                if (a.score !== b.score) {
                    return b.score - a.score;
                } else {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
            })
        } if(diff === "hard") {
            hard?.push(user)
            hard?.sort((a,b) => {
                if (a.score !== b.score) {
                    return b.score - a.score;
                } else {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
            })
        }
    }

    useEffect(() => {
        fetchLeaderboard().then(res => {
            setLeaderboard(res);
            setEasy(res.easy);
            setMedium(res.medium);
            setHard(res.hard);
        })
    }, [theUser]);

    const[rank, setRank] = useState<number>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: UserInfo = {
          name: name,
          score: score,
          date: new Date().toLocaleDateString(),
        };
        try {
            pushAndSort(difficulty, user);
            if(difficulty === "easy"){
                await addUserScoreEasy(user);
                await setRank(easy?.lastIndexOf(user)! + 1);
            } else if(difficulty === "medium"){
                await addUserScoreMedium(user);
                await setRank(medium?.lastIndexOf(theUser)! + 1);
            } else{
                await addUserScoreHard(user);
                await setRank(hard?.lastIndexOf(theUser)! + 1);
            }
            await setSeeRank(true);
        } catch (error) {
        }
      };

  return (
    <div className="GameOver">
        <h1>GAME OVER</h1>
        <p>Your score was {score}.</p>
        {
            seeRank === false?
            <form onSubmit={handleSubmit}>
                <label htmlFor="leaderboard_input">Enter your name to be added to the leaderboard and see what rank you placed</label>
                <input type="text" placeholder='Enter name here' onChange={(e) => {
                    setName(e.currentTarget.value);
                }} />
                <button type="submit" onClick={(e) => {
                    // e.preventDefault();
                    // if(difficulty === "easy"){
                    //     addUserScoreEasy({name: name, score: score, date: "this is a date"}).then(res => res.data);
                    // } else if(difficulty === "medium"){
                    //     addUserScoreMedium({name: name, score: score, date: "this is a date"}).then(res => res.data);                     
                    // } else {
                    //     addUserScoreHard({name: name, score: score, date: "this is a date"}).then(res => res.data);       
                    // }
                    // setSeeRank(true);
                }}>SUBMIT</button>
            </form>
            :
            <div>
                <p>You placed #{rank === 0 ? rank + 1 : rank} in the {difficulty} category.</p>
            </div>
        }
        <div className="button-grid">
            <button className="start-new"onClick={() => {
                newGame();
                navigate('/category_spin_wheel');
                }}>NEW GAME</button>
            <div>
                <button className="new-game" onClick={() => {
                    newGame();
                    navigate('/');
                    }}>HOME</button>
                <button className="new-game" onClick={() => {
                    newGame();
                    navigate('/leaderboard')
                }}>LEADERBOARD</button>
            </div>
        </div>
    </div>
  )
}
