import axios from "axios";
import { Question } from "../context/PlayerContext";

export default function TriviaAPI(category: string, difficulty: string): Promise<Question> {
  return axios
    .get<Question[]>(`https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}`)
    .then((res) => {
      return res.data[0];
    })
}
