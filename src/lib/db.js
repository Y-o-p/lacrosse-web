import pkg from 'pg';
const {Pool, Client} = pkg;

const pool = new Pool({
    database: import.meta.env.VITE_PGDATABASE || "postgres",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || 'S9388420',
})


export const connectToDB = async () => await pool.connect();
export const queryDB = async() => await pool.query('SELECT * FROM players'); // just a test