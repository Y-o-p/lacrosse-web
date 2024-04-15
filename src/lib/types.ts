// This file defines all the types that the lacrosse database defines and any
// related types that the database types depend on.

///////////////////////////////////////////////////////////////////////////////
// Team related types
///////////////////////////////////////////////////////////////////////////////

interface Coach {
    coach_id?: bigint,
    last_name: string,
    first_name: string,
    team_id?: bigint,
    email: string,
    phone: string,
    date_created: Date
};

interface Team {
    team_id?: bigint,
    team_name: string,
    coach_id: bigint
};

interface Game {
    game_id?: bigint,
    hometeam_id?: bigint,
    awayteam_id?: bigint,
    game_date: Date, 
    game_field: string,
    published: boolean,
    refs: Array<string>,
    scorekeepers: Array<string>,
    timekeepers: Array<string>
}

interface ScorebookSession {
    session_id?: bigint,
    game_id: bigint,
    coach_id: bigint
    room_code: string,
    expire_time: bigint,
}

///////////////////////////////////////////////////////////////////////////////
// Player related types
///////////////////////////////////////////////////////////////////////////////

enum Position {
    Attack,
    Midfield,
    Defense,
    Goalie,
    Faceoff,
    LSM
}

interface Player {
    player_id?: bigint,
    playerstat_id?: bigint,
    team_id: bigint,
    last_name: string,
    first_name: string,
    pos: string,
    height: number,
    weight: number,
    birth_date: Date
}

interface PlayerStats {
    playerstat_id?: bigint,
    player_id: bigint,
    team_id: bigint,
    game_id: bigint,
    goals: number,
    assists: number,
    shots: number,
    shots_on_goal: number,
    ground_balls: number,
    turnovers: number,
    turnovers_caused: number,
    faceoffs_won: number,
    faceoffs_lost: number,
    saves: number,
    penalties: number,
    clears_attempted: number,
    clears_made: number,
    goals_allowed: number
}

///////////////////////////////////////////////////////////////////////////////
// Misc.
///////////////////////////////////////////////////////////////////////////////

interface User {
    user_id?: bigint,
    user_name: string,
    pword: string,
    role_id: bigint,
    coach_id: bigint
}

///////////////////////////////////////////////////////////////////////////////
// Page Table Data:
///////////////////////////////////////////////////////////////////////////////
interface GameTable {
    "Game": string,
    "Date": Date,
    "Location": string,
    "Home Team": string,
    "Away Team": string,
    "Home Score": number,
    "Away Score": number,
    "REFS": string,
    "TKS": string,
    "SKS": string
}

interface TeamTable {
    "Team": string,
    "Coach": string,
    "Wins": number,
    "Losses": number,
}

interface PlayerTable {
    "Name": string,
    "Team": string,
    "#": number,
    "Position": string,
    "Height (inches)": number,
    "Weight (pounds)": number,
    "Class": string,
    "Major": string,
    "Home Town": string,
}

interface PlayerStatsTable {
    'Opponent': string,
    "#": number,
    "Player": string,
    "G": number,
    "A": number,
    "P": number,
    "S": number,
    "SOG": number,
    "GB": number,
    "TO": number,
    "CT": number,
    "CA": number,
    "CM": number,
    "FO Won": number,
    "FO Lost": number,
    "PEN": number
}

interface GoalieStatsTable {
    "#": number,
    "Player": string,
    "GA": number,
    "Saves": number
}