import { getTeam } from '$lib/db.js';
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    try {
        const team = await getTeam(Number(params.id));
        return json(team);
    }
    catch (err) {
        return error(500, err);
    }
}

