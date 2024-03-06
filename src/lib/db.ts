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

// Cookie Queries
export const getUserById = async (id: { user_id: any; }) => {
    const existingUser = id.user_id;
}

// Get array of players from team_id
export async function getPlayersByTeamId(teamId: bigint): Promise<Player[]> {
    return new Promise<Player[]>((resolve, reject) => {
        const query = `SELECT * FROM players WHERE team_id = $1`;
        const values = [teamId];

        pool.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        });
    });
}
