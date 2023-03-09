import React, {ReactNode, useState, useContext} from 'react'
import { Question } from './PlayerContext';
import PlayerContext from './PlayerContext';

interface Props {children: ReactNode; }

export default function PlayerContextProvider({children}: Props) {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [pastQuestions, setPastQuestions] = useState<Question[]>([])
    const [score, setScore] = useState<number>(0);
    const [hearts, setHearts] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>("easy");
    function resetCurrentQuestion(question: Question): void {
        setCurrentQuestion(question);
    }
    function pushPastQuestions(question: Question): void {
        setPastQuestions(prev => [...prev, question]);
    }
    function resetScore(): void {
        setScore(0);
    }
    function addScore(): void {
        setScore(score + 100);
    }
    function resetHearts(): void {
        setHearts(3);
    }
    function deleteHeart(): void {
        setHearts(hearts - 1);
    }
    function resetDifficulty(diff: string): void {
        setDifficulty(diff);
    }
  return (
    <PlayerContext.Provider value={{currentQuestion, pastQuestions, score, hearts, difficulty, resetCurrentQuestion, pushPastQuestions, resetScore, addScore, resetHearts, deleteHeart, resetDifficulty}}>
        {children}
    </PlayerContext.Provider>
  )
}
