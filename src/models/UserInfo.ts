export interface Leaderboard{
    _id: string,
    easy: UserInfo[],
    medium: UserInfo[],
    hard: UserInfo[]
}

export default interface UserInfo{
    name: string,
    score: number,
    date: string
}