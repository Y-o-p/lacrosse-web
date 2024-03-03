import { deleteRowsFromUrlParams, responseFromFunction, selectRowsFromUrlParams } from '$lib/api_util.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return selectRowsFromUrlParams("player_stats", url.searchParams);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
    return deleteRowsFromUrlParams("player_stats", url.searchParams);
}