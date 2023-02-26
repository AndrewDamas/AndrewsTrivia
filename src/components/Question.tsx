import React, {useContext} from 'react'
import PlayerContext from '../context/PlayerContext'

export default function Question() {
    const{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty} = useContext(PlayerContext);
    let wrongAnswers = currentQuestion?.incorrectAnswers;
    let answers = [currentQuestion?.correctAnswer];
    for (let i = answers.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  return (
    <div>
        <h1>{currentQuestion?.category}</h1>
        <p>{currentQuestion?.question}</p>
        {answers.map(answer => 
            <button>{answer}</button>
        )}
    </div>
  )
}
