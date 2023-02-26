import { createContext } from "react";

export interface Question{
    "category": string,
    "id": string,
    "correctAnswer": string,
    "incorrectAnswers": string[],
    "question": string,
    "difficulty": string
}

export interface PlayerContextModel{
    currentQuestion: Question | null;
    pastQuestions: Question[];
    score: number,
    hearts: number,
    difficulty: string,
    resetCurrentQuestion: (question: Question) => void,
    pushPastQuestions: (question: Question) => void,
    resetScore: () => void,
    addScore: () => void,
    resetHearts: () => void,
    deleteHeart: () => void,
    resetDifficulty: (diff: string) => void
}

const defaultValue: PlayerContextModel = {
    currentQuestion: null,
    pastQuestions: [],
    score: 0,
    hearts: 0,
    difficulty: "easy",
    resetCurrentQuestion: () => {},
    pushPastQuestions: () => {},
    resetScore: () => {},
    addScore:() => {},
    resetHearts:() => {},
    deleteHeart:() => {},
    resetDifficulty:() => {}
}

const PlayerContext = createContext(defaultValue);
export default PlayerContext;