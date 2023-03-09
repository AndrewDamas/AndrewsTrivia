import React, {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
import '../styles/Question.css'


export default function Question() {
  const{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty} = useContext(PlayerContext);
    let wrongAnswers = currentQuestion?.incorrectAnswers!;
    
    
    const navigate = useNavigate();
    
    const[correct, setCorrect] = useState<null | boolean>(null);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    useEffect(() => {
      const answers: string[] = [currentQuestion?.correctAnswer!, ...wrongAnswers];
      for (let i = answers.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      setShuffledAnswers(answers);
    }, [currentQuestion, wrongAnswers]);
    // console.log(shuffledAnswers);

    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
      while (seconds > 0){
        const timer = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [seconds]);
  
    useEffect(() => {
      const color = document.querySelector(`p.actual-time`) as HTMLElement;
      if(color !== null && seconds <=5){
        color.style.color = "#FF94A4";
      }
      if (seconds === 0) {
        (document.querySelector(`div.answers button:nth-child(${shuffledAnswers.findIndex(i => i === currentQuestion?.correctAnswer) + 1})`) as HTMLElement).style.backgroundColor = "#98FB98";
        buttonDisabled();
        if(correct === null){
          deleteHeart();
          setCorrect(false);
        }
      }
    }, [seconds]);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const buttonDisabled = () => {
      setIsButtonDisabled(true);
    }
    
  return (
    <div className='Question'>        <div className="hearts-and-score">
    {
      hearts === 3 ?
      <div className='three-hearts'>
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
      </div>
      : hearts === 2 ?
      <div className='three-hearts'>
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
      </div>
      : hearts === 1 ?
      <div className='three-hearts'>
        <img src={process.env.PUBLIC_URL + '/images/red-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
      </div>
      :
      <div className='three-hearts'>
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
        <img src={process.env.PUBLIC_URL + '/images/grey-heart.png'} alt="red-heart" />
      </div>
    }
    <p>Score: {score}</p>
  </div>
      <h1 className='title-category'>{currentQuestion?.category}</h1>
      <p className='question-text'>{currentQuestion?.question}</p>
      <div className='answers'>  
        {shuffledAnswers.map((answer) => 
          <button key={answer} className={`answer ${correct !== null && 'finished'}`} disabled = {isButtonDisabled} onClick={(e) => {
            buttonDisabled();
            if(e.currentTarget.innerHTML === currentQuestion?.correctAnswer){
              setCorrect(true);
              addScore();
              e.currentTarget.style.backgroundColor = "#98FB98";
              console.log("CORRECT");
            } else {
              setCorrect(false);
              deleteHeart();
              e.currentTarget.style.backgroundColor = "#FF94A4";
              const correctAnswerBtn = document.querySelector(`div.answers button:nth-child(${shuffledAnswers.findIndex(i => i === currentQuestion?.correctAnswer) + 1})`);
              console.log(shuffledAnswers);
              console.log(correctAnswerBtn);
              if (correctAnswerBtn !== null) {
                (correctAnswerBtn as HTMLElement).style.backgroundColor = "#98FB98";
              }
              console.log("INCORRECT the correct answer is: " + currentQuestion?.correctAnswer);
            } 
          }}>{answer}</button>
        )}
      </div>
      {
        correct !== null ?
        <button className="next" onClick={() => {
          setCorrect(null);
          if(hearts <= 0){
            navigate('/game_over')
          } else{
            navigate('/category_spin_wheel');
          }
        }}>NEXT</button>
        :
        <div className='seconds'>
          <p className='time'>Time</p>
          <p className='actual-time'>{seconds}</p>
        </div>
      }
    </div>
  )
}
