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
    birth_date: string,
    phone: string,
    date_created: string
};

interface Team {
    id: bigint,
    coachId: bigint,
    name: string
};

interface TeamStats {
    id: bigint,
    teamId: bigint,
    gameId: bigint,
    goals: number,
    assists: number,
    shots: number,
    timeouts: number,
    field: string
}

interface Game {
    id: bigint,
    homeTeamId: bigint,
    awayTeamId: bigint,
    homeStatsId: bigint,
    awayStatsId: bigint,
    date: Date    
}

interface ScorebookSession {
    id: bigint,
    gameId: bigint,
    expirationTime: bigint,
    roomCode: string,
    coachId: bigint
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
    id: bigint,
    teamId: bigint,
    playerStatsId: bigint,
    lastName: string,
    firstName: string,
    position: Position,
    height: number,
    weight: number,
    birthdate: Date
}

interface PlayerStats {
    id: bigint,
    playerId: bigint,
    gameId: bigint,
    goals: number,
    assists: number,
    shots: number,
    faceoffsWon: number,
    faceoffsLost: number,
    saves: number,
    penalties: number
}

///////////////////////////////////////////////////////////////////////////////
// Misc.
///////////////////////////////////////////////////////////////////////////////

interface User {
    user_id?: bigint,
    user_name?: string,
    pword?: string,
    role_id?: bigint,
    coach_id?: bigint
}
