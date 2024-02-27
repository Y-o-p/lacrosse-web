import { getRandomCode } from '$lib/util.js';
import { pool } from '$lib/db.js';
import { json } from '@sveltejs/kit'

// The game ID must be supplied for this to succeed
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    const session: ScorebookSession = {
        game_id: data.game_id ? BigInt(data.game_id) : null,
        coach_id: BigInt(data.coach_id),
        room_code: data.room_code || getRandomCode(6),
        expire_time: BigInt(data.expire_time || Math.floor(Date.now() / 1000) + 60 * 60)
    }
    const result = await pool.query(
        'INSERT INTO\
        scorebook_sessions(game_id, expire_time, coach_id, room_code)\
        VALUES ($1, $2, $3, $4)\
        RETURNING (room_code)',
        [session.game_id, session.expire_time, session.coach_id, session.room_code]
    );
    return json(result.rows[0]);
}