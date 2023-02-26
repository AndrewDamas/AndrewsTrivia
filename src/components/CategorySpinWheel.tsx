import React, {useState, useContext} from 'react';
import PlayerContext from '../context/PlayerContext';
import TriviaAPI from '../services/TriviaAPI';
import Question from './Question';
import '../styles/CategorySpinWheel.css';
import {useNavigate} from "react-router-dom";

export default function CategorySpinWheel() {
    interface Category {
        id: number;
        name: string;
        class: string;
        uri: string
      }

      const navigate = useNavigate();

      const{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty} = useContext(PlayerContext);
      
      const categories: Category[] = [
        { id: 1, name: 'GENERAL KNOWLEDGE', class: "general-knowledge-spin", uri: "general_knowledge" },
        { id: 2, name: 'GEOGRAPHY', class: "geography-spin", uri: "geography" },
        { id: 3, name: 'FILM & TV', class: "film-tv-spin" , uri: "film_and_tv"},
        { id: 4, name: 'HISTORY', class: "history-spin", uri: "history" },
        { id: 5, name: 'MUSIC', class: "music-spin", uri: "music" },
        { id: 6, name: 'FOOD & DRINK', class: "food-drink-spin", uri: "food_and_drink" },
        { id: 7, name: 'SCIENCE', class: "science-spin", uri: "science" },
        { id: 8, name: 'ARTS & LITERATURE', class: "arts-literature-spin", uri: "arts_and_literature" },
        { id: 9, name: 'SPORT & LEISURE', class: "sport-leisure-spin", uri: "sport_and_leisure" },
        { id: 10, name: 'SOCIETY & CULTURE', class: "society-culture-spin", uri: "society_and_culture" }
      ];
      
    const [screen, setScreen] = useState("spin");

    const [spinResult, setSpinResult] = useState<Category | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [randomCategoryClass, setRandomCategoryClass] = useState<string>("");
    const [spinButtonVisible, setSpinButtonVisible] = useState(true);

    const spinWheel = () => {
      setIsSpinning(true);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      TriviaAPI(randomCategory.uri, difficulty).then(data => {
        resetCurrentQuestion(data);
      })
      setRandomCategoryClass(randomCategory.class);
      setTimeout(() => {
          setSpinResult(randomCategory);
          setIsSpinning(false);
          setScreen("chosen");
      }, 6000);
  };
  return (
    <div>
      <div>
        <div>
            <p>Hearts</p>
            <p>Score: 200</p>
        </div>
        <h2>CATEGORY SPIN WHEEL</h2>
        <div id="wheel-div">
          <img src={process.env.PUBLIC_URL + '/images/wheel.png'} alt="spinning image" className={`${randomCategoryClass} wheel`} />
          <img src={process.env.PUBLIC_URL + '/images/WheelArrow.png'} alt="spinning image" className='wheel-arrow'/>
        </div>
        {
          spinButtonVisible && 
          <button onClick={() => {
            setSpinButtonVisible(false);
            spinWheel();
          }
          }>SPIN</button>
        }
      </div>
      {
        screen === "chosen" &&
        <div className='picked-screen'>
          <p>Your category is:</p>
          <p>{spinResult?.name}</p>
          <button onClick={() => {
            setScreen("spin");
            setRandomCategoryClass("");
            setSpinButtonVisible(true);
            navigate('/question');
          }}>GO TO QUESTION</button>
        </div>
      }
    </div>
  )
}
