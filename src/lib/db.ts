import pg from 'pg';

export const pool = new pg.Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || "S9388420",
})


export const connectToDB = async () => await pool.connect();

// To avoid SQL injection, don't allow user input to go into the first 2 parameters
// tableName and tableIdName should always be programmer defined
export async function getRowFromID(tableName: string, tableIdName: string, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const result = pool.query(`SELECT * FROM ${tableName} WHERE ${tableIdName} = $1`, [id]);
        result.then((innerResult) => {
            const data = innerResult.rows[0];
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function getRowFromVals(tableName: string, vals: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let query = `SELECT * FROM ${tableName}`;
        let colNames = Object.keys(vals);
        let valNames = Object.values(vals);
        for (let i = 0; i < Object.keys(vals).length; i++) {
            query += ' ';
            if (i == 0) {
                query += `WHERE ${colNames[i]} = '${valNames[i]}'`
            } else {
                query += `AND ${colNames[i]} = '${valNames[i]}'`
            }
        }
        query += ';'
        //console.log(query)

        const result = pool.query(query);
        result.then((innerResult) => {
            const data = innerResult.rows[0];
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function insertRow(tableName: string, object: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let colNames = Object.keys(object).join(",");
        let valNum = [];
        for ( let i = 1; i < Object.keys(object).length+1; i++) {
            valNum.push(`$${i}`);
        }
        let valNames = valNum.join(",");
        //console.log(`INSERT INTO ${tableName} (${colNames}) VALUES (${valNames}) RETURNING *;`);

        const result = pool.query(
            `INSERT INTO ${tableName} (${colNames})
             VALUES (${valNames})
             RETURNING *;`, Object.values(object));
            
        result.then((innerResult) => {
            const data = innerResult.rows[0];
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}



export async function insertUser(user: Partial<User>): Promise<any> {
    delete user.user_id;
    return insertRow("users", user);
}

export async function insertCoach(coach: Partial<Coach>): Promise<any> {
    delete coach.coach_id;
    return insertRow("coaches", coach);
}

export async function getUser(user: Partial<User>): Promise<any> {
    return getRowFromVals("users", user);
}

export async function getCoach(id: number): Promise<any> {
    return getRowFromID("coaches", "coach_id", id);
}

export async function getPlayer(id: number): Promise<any> {
    return getRowFromID("players", "player_id", id);
}

export async function getGame(id: number): Promise<any> {
    return getRowFromID("games", "game_id", id);
}

export async function getTeamStats(id: number): Promise<any> {
    return getRowFromID("team_stats", "teamstats_id", id);
}

export async function getSession(id: number): Promise<any> {
    return getRowFromID("scorebook_sessions", "session_id", id);
}

export async function insertPlayer(player: Partial<Player>): Promise<any> {
    delete player.player_id;
    return insertRow("players", player);
}

export async function insertTeam(team: Partial<Team>): Promise<any> {
    delete team.team_id;
    return insertRow("teams", team)
}

// TODO: ADD game id as param
export async function insertPlayer_Stats(team_id: bigint): Promise<any> {
    let players = await getPlayersByTeamId(team_id);
    // log players first names

    for (let player in players)  {
        let player_stats = {
            game_id: BigInt(0),
            player_id: players[player].player_id,
            goals: 0,
            assists: 0,
            shots: 0,
            faceoffs_won: 0,
            faceoffs_lost: 0,
            saves: 0,
            penalties: 0,
            clears_attempted: 0,
            clears_made: 0
        };
        insertRow("player_stats", player_stats)
    }
}

// Cookie Queries
export const getUserById = async (id: { user_id: any; }) => {
    const existingUser = id.user_id;
}

// Get array of players from team_id
export async function getPlayersByTeamId(teamId: bigint): Promise<Player[]> {
    return new Promise<Player[]>((resolve, reject) => {
        const query = `SELECT * FROM players WHERE team_id = $1`;
        const values = [teamId];

        pool.query(query, values)
            .then((result) => {
                resolve(result.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Get 

export async function updateCoachTeamId(coachId: bigint): Promise<any>{
    try {
        // Get the maximum team_id from coaches table
        const getMaxTeamIdQuery = `SELECT COALESCE(MAX(team_id), 0) + 1 AS max_team_id FROM teams`;
        const maxTeamIdResult = await pool.query(getMaxTeamIdQuery);
        const maxTeamId = maxTeamIdResult.rows[0].max_team_id;

        // Update the coach's team_id
        const updateCoachQuery = `UPDATE coaches SET team_id = $1 WHERE coach_id = $2`;
        const updateCoachValues = [maxTeamId, coachId];
        await pool.query(updateCoachQuery, updateCoachValues);

        // Return the updated coach data or success message
        return { success: true, message: `Coach ${coachId} assigned to team ${maxTeamId}`, teamID: `${maxTeamId}` };
    } catch (error) {
        // Handle errors
        throw new Error(`Error updating coach team ID: ${error.message}`);
    }
}

export async function setCoachTeamId(coachId: bigint, teamId: bigint): Promise <any>{
    try {
        const team_id = teamId;
        const coach_id = coachId;
        const updateCoachQuery = `UPDATE coaches SET team_id = $1 WHERE coach_id = $2`;
        const updateCoachValues = [team_id, coach_id];
        await pool.query(updateCoachQuery, updateCoachValues);
        
        return {success: true, message: `Coach ${coach_id} assigned to team ${team_id}`};

    } catch(error) {
        // Handle Errors
        throw new Error(`Error updating coach team ID, given teamID: ${error.message}`);

    }

}
