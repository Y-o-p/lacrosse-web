import pg from 'pg';

export const pool = new pg.Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || 'ident',
})


export const connectToDB = async () => await pool.connect();

// To avoid SQL injection, don't allow user input to go into the first 2 parameters
// tableName and tableIdName should always be programmer defined
export async function getRow(tableName: string, tableIdName: string, id: number): Promise<any> {
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

export async function getCoach(id: number): Promise<any> {
    return getRow("coaches", "coach_id", id);
}

export async function getGame(id: number): Promise<any> {
    return getRow("games", "game_id", id);
}

export async function getTeamStats(id: number): Promise<any> {
    return getRow("team_stats", "teamstats_id", id);
}