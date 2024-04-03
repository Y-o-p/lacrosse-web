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
    let queryConditions = [];
    let i = 1;
    for (const [columnName, value] of Object.entries(object)) {
        if (value === undefined) {
            continue;
        }
        if (value === null || value == "null") {
            queryConditions.push(`${columnName} IS NULL`);
        }
        else {
            queryConditions.push(`${columnName} = $${i}`);
            values.push(value);
            i++;
        }
    }
    if (queryConditions.length > 0) {
        query += " WHERE " + queryConditions.join(" AND ");
    }

    const result = await pool.query(query, values);
    return result.rows;
}

///////////////////////////////////////////////////////////////////////////////
// Conditional Query Functions (For Table Displays on pages)
///////////////////////////////////////////////////////////////////////////////

async function queryFromDayInterval(tableName: string, dateCol: string, interval: number) {
    let query = `SELECT * FROM ${tableName} WHERE `;
    query += dateCol + " > now() - interval '" + interval + " day';";

    const result = await pool.query(query);
    return result.rows;
}

export async function getGameStats(game_id: any, team_id: any) {
    let query = `SELECT * FROM player_stats `;
    query += `WHERE game_id = ${game_id} `;
    query += `AND team_id = ${team_id} `;
    query += `AND goals > 0;`

    const result = await pool.query(query);
    return result.rows;
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

export async function insertUser(user: Partial<User>): Promise<any> {
    delete user.user_id;
    return insertRow("users", user);
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

///////////////////////////////////////////////////////////////////////////////
// EDIT Functions
///////////////////////////////////////////////////////////////////////////////

export async function editRow(tableName: string, vals: any, ids: any): Promise<any> {
    let query = `UPDATE ${tableName} SET`;
    let valColNames = Object.keys(vals);
    let valNames = Object.values(vals);
    for (let i = 0; i < Object.keys(vals).length; i++) {
        query += ` ${valColNames[i]} = '${valNames[i]}'`
        if (i != Object.keys(vals).length - 1) {
            query += ','
        }
    }

    let idColNames = Object.keys(ids);
    let idNames = Object.values(ids);
    for (let i = 0; i < Object.keys(ids).length; i++) {
        query += ' ';
        if (i == 0) {
            query += `WHERE ${idColNames[i]} = '${idNames[i]}'`;
        } else {
            query += `AND ${idColNames[i]} = '${idNames[i]}'`;
        }
    }
    query += ' RETURNING *;';

    const result = await pool.query(query);
    return result.rows[0];
}

export async function editUser(vals: Partial<User>, ids: Partial<User>) {
    delete vals.user_id;
    return editRow("users", vals, ids);
}

export async function editCoach(vals: Partial<Coach>, ids: Partial<Coach>) {
    delete vals.coach_id;
    return editRow("coaches", vals, ids);
}

export async function editGame(vals: Partial<Game>, ids: Partial<Game>) {
    delete vals.game_id;
    return editRow("games", vals, ids);
}

export async function editPlayerStats(vals: Partial<PlayerStats>, ids: Partial<PlayerStats>) {
    delete vals.playerstat_id;
    return editRow("player_stats", vals, ids);
}

export async function editPlayer(vals: Partial<Player>, ids: Partial<Player>) {
    delete vals.player_id;
    return editRow("players", vals, ids);
}

export async function editScorebookSession(vals: Partial<ScorebookSession>, ids: Partial<ScorebookSession>) {
    delete vals.session_id;
    return editRow("sk_session", vals, ids);
}

export async function editTeam(vals: Partial<Team>, ids: Partial<Team>) {
    delete vals.team_id;
    return editRow("teams", vals, ids);
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

export async function getGameByInterval(interval: number): Promise<any> {
    return queryFromDayInterval("games", "game_date", interval);
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