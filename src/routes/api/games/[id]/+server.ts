import { getGame } from '$lib/db.js';
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const coach = await getGame(Number(params.id));
    return json(coach);
}

