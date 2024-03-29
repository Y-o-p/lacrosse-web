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
    birth_date: Date,
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
    hometeam_id: bigint,
    awayteam_id: bigint,
    game_date: Date, 
    game_field: string
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
    team_id: bigint,
    playerstats_id: bigint,
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
    game_id: bigint,
    goals: number,
    assists: number,
    shots: number,
    faceoffs_won: number,
    faceoffs_lost: number,
    saves: number,
    penalties: number,
    clears_attempted: number,
    clears_made: number
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
interface RecentGame {
    "Game Date": Date,
    "Game Field": string,
    "Home Team": string,
    "Away Team": string,
    "Home Score": number,
    "Away Score": number
}