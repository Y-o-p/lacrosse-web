import { getRow, pool } from '$lib/db.js';
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const coach = await getRow("games", "game_id", Number(params.id));
    return json(coach);
}

