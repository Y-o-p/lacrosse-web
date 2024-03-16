import { getRowFromID, pool } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const game = await getRowFromID("games", "game_id", Number(params.id));
    return json(game);
}

// updates game info
export async function PUT({ params, request }) {
    const { id } = params;
    const gameUpdate = await request.json();
    
    try {
        const { game_date, game_field, hometeam_id, awayteam_id } = gameUpdate;
        const res = await pool.query(
            'UPDATE games SET game_date = $1, game_field = $2, hometeam_id = $3, awayteam_id = $4 WHERE game_id = $5 RETURNING *',
            [game_date, game_field, hometeam_id, awayteam_id, Number(id)]
        );

        if (res.rows.length === 0) {
            
            return json({ error: 'Game not found or no update made' }, { status: 404 });
        }

        //successfully updated the game information and return the updated data
        return json(res.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        // return error
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
