import { pool } from '$lib/db.js';
import { json } from '@sveltejs/kit'

// The team ID must be supplied for this to succeed
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    const stats: TeamStats = {
        game_id: BigInt(data.game_id || 0),
        team_id: BigInt(data.team_id),
        goals: Number(data.goals || 0),
        assists: Number(data.assists || 0),
        shots: Number(data.shots || 0),
        timeouts: Number(data.timeouts || 0),
        field: data.field || "unknown"
    }
    const result = await pool.query(
        'INSERT INTO\
        team_stats(game_id, team_id, goals, assists, shots, timeouts, field)\
        VALUES ($1, $2, $3, $4, $5, $6, $7)\
        RETURNING (teamstats_id)',
        [stats.game_id, stats.team_id, stats.goals, stats.assists, stats.shots, stats.timeouts, stats.field]
    );
    return json(result.rows[0]);
}