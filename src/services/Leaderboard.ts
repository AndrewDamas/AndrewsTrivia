import UserInfo, {Leaderboard} from "../models/UserInfo"
import axios from "axios";

const baseUrl = "https://us-central1-andrew-s-trivia.cloudfunctions.net/api";


if (!baseUrl) {
    console.error("Missing config REACT_APP_OUR_POKEMON_API_URL");
}

export function fetchLeaderboard():Promise<Leaderboard>{
    return axios.get<Leaderboard[]>(`${baseUrl}/`)
    .then(res => {return res.data[0]});
}

export function addUserScoreEasy(user: UserInfo){
    return axios.put(`${baseUrl}/add_submission_easy`, user)
    .then(response => response.data);
}

export function addUserScoreMedium(user: UserInfo){
    return axios.put(`${baseUrl}/add_submission_medium`, user)
    .then(response => response.data);
}

export function addUserScoreHard(user: UserInfo){
    return axios.put(`${baseUrl}/add_submission_hard`, user)
    .then(response => response.data);
}