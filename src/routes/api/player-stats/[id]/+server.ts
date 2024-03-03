import { deletePlayerStats, getPlayerStats } from '$lib/db.js';
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const playerStats = await getPlayerStats(Number(params.id));
    return json(playerStats);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    try {
        const id = await deletePlayerStats(Number(params.id));
        return json(id);
    }
    catch (err) {
        return error(500, err);
    }
}