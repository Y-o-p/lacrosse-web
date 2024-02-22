import pg from 'pg';

const pool = new pg.Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || 'ident',
})


export const connectToDB = async () => await pool.connect();

export const queryDB = async() => await pool.query('SELECT NOW()'); // just a test

export async function getCoach(id: number): Promise<Coach> {
    return new Promise<any>((resolve, reject) => {
        const result = pool.query('SELECT * FROM coaches WHERE coach_id = $1', [id]);

        result.then((innerResult) => {
            const data = innerResult.rows[0];
            
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}