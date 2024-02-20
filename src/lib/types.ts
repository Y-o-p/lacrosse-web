// This file defines all the types that the lacrosse database defines and any
// related types that the database types depend on.

///////////////////////////////////////////////////////////////////////////////
// Team related types
///////////////////////////////////////////////////////////////////////////////

interface Coach {
    ID: bigint,
    teamID: bigint,
    lastName: string,
    firstName: string,
    birthdate: Date,
    createdDate: Date
};

interface Team {
    ID: bigint,
    coachID: bigint,
    name: string
};

interface TeamStats {
    ID: bigint,
    teamID: bigint,
    gameID: bigint,
    goals: number,
    assists: number,
    shots: number,
    timeouts: number,
    field: string
}

interface Game {
    ID: bigint,
    homeTeamID: bigint,
    awayTeamID: bigint,
    homeStatsID: bigint,
    awayStatsID: bigint,
    date: Date    
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
    ID: bigint,
    teamID: bigint,
    playerStatsID: bigint,
    lastName: string,
    firstName: string,
    position: Position,
    height: number,
    weight: number,
    birthdate: Date
}

interface PlayerStats {
    ID: bigint,
    playerID: bigint,
    gameID: bigint,
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
    ID: bigint,
    username: string,
    // TODO: figure out how to securely store passwords
    roleID: bigint,
    coachID: bigint
}