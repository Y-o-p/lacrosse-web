// These are database related functions. They should only ever be called
// from the server side.

import { error, json } from '@sveltejs/kit';
import pg from 'pg';

export const pool = new pg.Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || "ident",
})

async function queryFromVals(action: string, tableName: string, object?: any) {
    let query = `${action} FROM ${tableName}`;
    let values = [];
    let i = 1;
    for (const [columnName, value] of Object.entries(object)) {
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

export async function insertCoach(coach: Partial<Coach>): Promise<any> {
    delete coach.coach_id;
    return insertRow("coaches", coach);
}

export async function insertGame(game: Partial<Game>): Promise<any> {
    delete game.game_id;
    return insertRow("games", game);
}

export async function insertPlayerStats(playerStats: Partial<PlayerStats>): Promise<any> {
    delete playerStats.playerstat_id;
    return insertRow("player_stats", playerStats);
}

export async function insertPlayer(player: Partial<Player>): Promise<any> {
    delete player.player_id;
    return insertRow("players", player);
}

export async function insertScorebookSession(scorebookSession: Partial<ScorebookSession>): Promise<any> {
    delete scorebookSession.session_id;
    return insertRow("sk_session", scorebookSession);
}

export async function insertTeam(team: Partial<Team>): Promise<any> {
    delete team.team_id;
    return insertRow("teams", team);
}

export async function insertUser(user: Partial<User>): Promise<any> {
    delete user.user_id;
    return insertRow("users", user);
}

///////////////////////////////////////////////////////////////////////////////
// SELECT Functions
///////////////////////////////////////////////////////////////////////////////

// To avoid SQL injection, don't allow user input to go into the first 2 parameters
// tableName and tableIdName should always be programmer defined
export async function getRowFromId(tableName: string, tableIdName: string, id: number): Promise<any> {
    try {
        const result = await pool.query(`SELECT * FROM ${tableName} WHERE ${tableIdName} = $1`, [id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}

export async function getRowsFromVals(tableName: string, vals?: any): Promise<any> {
    return queryFromVals("SELECT *", tableName, vals);
}

export async function getCoach(id: number): Promise<any> {
    return getRowFromId("coaches", "coach_id", id);
}

export async function getGame(id: number): Promise<any> {
    return getRowFromId("games", "game_id", id);
}

export async function getPlayerStats(id: number): Promise<any> {
    return getRowFromId("player_stats", "playerstat_id", id);
}

export async function getPlayer(id: number): Promise<any> {
    return getRowFromId("players", "player_id", id);
}

export async function getScorebookSession(id: number): Promise<any> {
    return getRowFromId("scorebook_sessions", "session_id", id);
}

export async function getTeam(id: number): Promise<any> {
    return getRowFromId("teams", "team_id", id);
}

export async function getUser(user: Partial<User>): Promise<any> {
    return getRowsFromVals("users", user);
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

export async function deleteRowsFromVals(tableName: string, vals?: any): Promise<any> {
    return queryFromVals("DELETE", tableName, vals);
}

export async function deleteCoach(id: number) {
    return deleteRowFromId("coaches", "coach_id", id);
}

export async function deleteGame(id: number) {
    return deleteRowFromId("games", "game_id", id);
}

export async function deletePlayerStats(id: number) {
    return deleteRowFromId("player_stats", "playerstat_id", id);
}

export async function deletePlayer(id: number) {
    return deleteRowFromId("players", "player_id", id);
}

export async function deleteScorebookSession(id: number) {
    return deleteRowFromId("sk_session", "session_id", id);
}

export async function deleteTeam(id: number) {
    return deleteRowFromId("player_stats", "playerstat_id", id);
}

export async function deleteUser(id: number) {
    return deleteRowFromId("users", "user_id", id);
}