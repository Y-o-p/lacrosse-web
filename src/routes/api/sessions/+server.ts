import { pool } from '$lib/db.js';
import { json } from '@sveltejs/kit'

// The game ID must be supplied for this to succeed
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    const session: ScorebookSession = {
        id: null,
        gameId: BigInt(data.gameId),
        expirationTime: BigInt(data.expirationTime || Math.floor(Date.now() / 1000) + 60 * 60)
    }
    const result = await pool.query(
        'INSERT INTO\
        scorebook_sessions(game_id, expire_time)\
        VALUES ($1, $2)\
        RETURNING (session_id)',
        [session.gameId, session.expirationTime]
    );
    return json(result.rows[0]);
}