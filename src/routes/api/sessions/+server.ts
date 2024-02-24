import { getRandomCode } from '$lib/util.js';
import { pool } from '$lib/db.js';
import { json } from '@sveltejs/kit'

// The game ID must be supplied for this to succeed
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    const session: ScorebookSession = {
        id: null,
        gameId: data.gameId ? BigInt(data.gameId) : null,
        expirationTime: BigInt(data.expirationTime || Math.floor(Date.now() / 1000) + 60 * 60),
        roomCode: data.roomCode || getRandomCode(6),
        coachId: BigInt(data.coachId)
    }
    const result = await pool.query(
        'INSERT INTO\
        scorebook_sessions(game_id, expire_time, coach_id, room_code)\
        VALUES ($1, $2, $3, $4)\
        RETURNING (room_code)',
        [session.gameId, session.expirationTime, session.coachId, session.roomCode]
    );
    return json(result.rows[0]);
}