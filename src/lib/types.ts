// This file defines all the types that the lacrosse database defines and any
// related types that the database types depend on.

///////////////////////////////////////////////////////////////////////////////
// Team related types
///////////////////////////////////////////////////////////////////////////////

interface Coach {
    id: bigint,
    teamId: bigint,
    lastName: string,
    firstName: string,
    birthdate: Date,
    createdDate: Date
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
    id: bigint,
    username: string,
    // TODO: figure out how to securely store passwords
    roleId: bigint,
    coachId: bigint
}
