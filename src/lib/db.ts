import { error, json } from '@sveltejs/kit';
import pg from 'pg';

export const pool = new pg.Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || "ident",
})

///////////////////////////////////////////////////////////////////////////////
// INSERT Functions
///////////////////////////////////////////////////////////////////////////////

export async function insertRow(tableName: string, object: any): Promise<any> {
    let colNames = Object.keys(object).join(",");
    let valNum = [];
    for ( let i = 1; i < Object.keys(object).length+1; i++) {
        valNum.push(`$${i}`);
    }
    let valNames = valNum.join(",");
    //console.log(`INSERT INTO ${tableName} (${colNames}) VALUES (${valNames}) RETURNING *;`);

    try {
        const result = await pool.query(
            `INSERT INTO ${tableName} (${colNames})
            VALUES (${valNames})
            RETURNING *;`,
            Object.values(object)
        );
    
        return result.rows[0];
    } 
    catch (error) {
        throw error;
    }
}

export async function insertUser(user: Partial<User>): Promise<any> {
    delete user.user_id;
    return insertRow("users", user);
}

export async function insertCoach(coach: Partial<Coach>): Promise<any> {
    delete coach.coach_id;
    return insertRow("coaches", coach);
}

export async function insertPlayer(player: Partial<Player>): Promise<any> {
    delete player.player_id;
    return insertRow("players", player);
}

///////////////////////////////////////////////////////////////////////////////
// GET Functions
///////////////////////////////////////////////////////////////////////////////

// To avoid SQL injection, don't allow user input to go into the first 2 parameters
// tableName and tableIdName should always be programmer defined
export async function getRowFromID(tableName: string, tableIdName: string, id: number): Promise<any> {
    try {
        const result = await pool.query(`SELECT * FROM ${tableName} WHERE ${tableIdName} = $1`, [id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

export async function getRowsFromVals(tableName: string, vals?: any): Promise<any> {
    let query = `SELECT * FROM ${tableName}`;
    let values = [];
    let i = 1;
    for (const [columnName, value] of Object.entries(vals)) {
        if (value === null || value === undefined) {
            continue;
        }
        if (i == 1) {
            query += ` WHERE ${columnName} = $${i}`
        } else {
            query += ` AND ${columnName} = $${i}`
        }
        values.push(value);
        i++;
    }

    try {
        const result = await pool.query(query, values);
        return result.rows;
    }
    catch (error) {
        return error;
    }
}

export async function getRowsFromUrlParams(tableName: string, urlParams: URLSearchParams): Promise<Response> {
    const obj = {};
    for (const [key, value] of urlParams) {
        obj[key] = value;
    }

    try {
        const result = await getRowsFromVals(tableName, obj);
        return json(result);
    }
    catch (err) {
        error(err);
    }
}

export async function getUser(user: Partial<User>): Promise<any> {
    return getRowsFromVals("users", user);
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

export async function getGamesWithCoach(coach_id: number) : Promise<any> {
    const team = (await getRowsFromVals("teams", {coach_id: coach_id}))[0];
    let query = 'SELECT * FROM games WHERE hometeam_id = $1 OR awayteam_id = $1';
    
    try {
        const result = await pool.query(query, [team.team_id]);
        return result.rows;
    }
    catch (error) {
        throw (error);
    }
}

export async function getTeam(id: number): Promise<any> {
    return getRowFromID("teams", "team_id", id);
}

export async function getPlayerStats(id: number): Promise<any> {
    return getRowFromID("player_stats", "playerstat_id", id);
}

export async function getSession(id: number): Promise<any> {
    return getRowFromID("scorebook_sessions", "session_id", id);
}

// Cookie Queries
export const getUserById = async (id: { user_id: any; }) => {
    const existingUser = id.user_id;
}

///////////////////////////////////////////////////////////////////////////////
// DELETE Functions
///////////////////////////////////////////////////////////////////////////////

export async function deleteRowFromId(tableName: string, tableIdName: string, id: number) {
    try {
        const result = await pool.query(`DELETE FROM ${tableName} WHERE ${tableIdName} = $1 RETURNING (${tableIdName})`, [id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

export async function deletePlayerStats(id: number) {
    return deleteRowFromId("player_stats", "playerstat_id", id);
}