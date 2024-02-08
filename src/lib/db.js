import pkg from 'pg';
const {Pool, Client} = pkg;

const pool = new Pool({
    database: import.meta.env.VITE_PGDATABASE || "master",
    user: import.meta.env.VITE_PGUSER || "postgres",
    host: import.meta.env.VITE_PGHOST || "localhost",
    port: (Number(import.meta.env.VITE_PGPORT || 5432 )),
    password: import.meta.env.VITE_PGDATABASE || '25uPY996mWr#',
})


export const connectToDB = async () => await pool.connect();
export const queryDB = async() => await pool.query('SELECT NOW()'); // just a test