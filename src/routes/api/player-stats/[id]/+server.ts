import { responseFromFunction } from '$lib/api_util.js';
import { deletePlayerStats, getPlayerStats } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getPlayerStats(Number(params.id));
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deletePlayerStats(Number(params.id));
    })
}