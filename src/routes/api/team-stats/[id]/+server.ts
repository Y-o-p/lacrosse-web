import { getRow, getTeamStats } from '$lib/db.js';
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const teamStats = await getTeamStats(Number(params.id));
    return json(teamStats);
}