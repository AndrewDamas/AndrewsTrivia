import React, {useState, useContext, useEffect} from 'react';
import PlayerContext, { Question } from '../context/PlayerContext';
import TriviaAPI from '../services/TriviaAPI';
import '../styles/CategorySpinWheel.css';
import {useNavigate, useLocation} from "react-router-dom";

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

    const resetSpinResult = () => {
      setSpinResult(null);
    };

    const[switching, setSwitching] = useState(false);
    
    useEffect(() => {
      if(switching){
        spinWheel();
      }
    }, [switching])
    const [spinResult, setSpinResult] = useState<Category | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [randomCategoryClass, setRandomCategoryClass] = useState<string>("");
    const [spinButtonVisible, setSpinButtonVisible] = useState(true);
    const spinWheel = async () => {   
      setScreen("spin");
      // console.log("screen is: " + screen);
      resetSpinResult();
      // console.log("spinResult is: " + spinResult);
      setIsSpinning(true);
      // console.log("isSpinning is: " + isSpinning);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      // console.log("randomCategory is: " + randomCategory.name);
      let theQuestion: Question;
      TriviaAPI(randomCategory.uri, difficulty).then(data => {
        // console.log("starting TriviaAPI");
        theQuestion = data;
        // let loop = false;
        // console.log('loop = ' + loop)
        // do{
        //   console.log('starting loop');
        //   theQuestion = data;
        //   console.log('current question is: ' + theQuestion.question);
        //   console.log('current question id is: ' + theQuestion.id);
        //   console.log('question difficulty is: ' + theQuestion.difficulty);
        //   loop = false;
        //   console.log('loop = ' + loop);
        //   pastQuestions.forEach(i => {
        //     console.log("does " + i.id + " match with: "+ currentQuestion?.id);
        //     if(i.id === theQuestion.id){
        //       loop = true;
        //       console.log('yes it does. loop is now: ' + loop);
        //     } else {
        //       console.log('no it does not. Loop is now: ' + loop);
        //     }
        //   });
        //   if(loop === false){
        //     console.log('pushing question to past questions');
        //     pushPastQuestions(data);
        //   }
        // }
        // while(loop);
        resetCurrentQuestion(theQuestion);
        // console.log('question is: ' + currentQuestion?.question);
      })
      setRandomCategoryClass(randomCategory.class);
      // console.log('loop is over. randomCategoryClass is: '+ randomCategoryClass);
      setTimeout(() => {
        setSpinResult(randomCategory);
        setIsSpinning(false);
        setScreen("chosen");
        setRandomCategoryClass("");
        // console.log(screen);
      }, 6000);
    };
  return (
    <div className="CategorySpinWheel">
      <div className="before-chosen">
        <div className="hearts-and-score">
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
        <div className='category-spin-wheel-title'>
          <h2>CATEGORY</h2>
          <h2>SPIN WHEEL</h2>
        </div>
        <div id="wheel-div">
          <img src={process.env.PUBLIC_URL + '/images/wheel.png'} alt="spinning image" className={`${randomCategoryClass} wheel`} />
          <img src={process.env.PUBLIC_URL + '/images/WheelArrow.png'} alt="spinning image" className='wheel-arrow'/>
        </div>
        {
          spinButtonVisible && 
          <button className="spin-button" onClick={() => {
            setSpinButtonVisible(false);
            setSwitching(true);
          }
          }>SPIN</button>
        }
      </div>
      {
        screen === "chosen" &&
        <div className='black-screen'>
          <div className='picked-screen'>
            <p className='your-cat-is'>Your category is:</p>
            <p className='picked-screen-cat'>{spinResult?.name}</p>
            <button onClick={async () => {
              setSpinButtonVisible(true);
              setSwitching(false);
              await navigate('/question');
            }}>GO TO QUESTION</button>
          </div>
        </div>
      }
    </div>
  )
}
