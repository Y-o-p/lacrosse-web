import { deleteRowsFromUrlParams, responseFromFunction, selectRowsFromUrlParams } from '$lib/api_util.js';
import { insertPlayerStats } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return selectRowsFromUrlParams("player_stats", url.searchParams);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    return responseFromFunction(async () => {
        const data = await request.json();
        const playerStats = data as PlayerStats;
        return insertPlayerStats(playerStats);
    });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
    return deleteRowsFromUrlParams("player_stats", url.searchParams);
}