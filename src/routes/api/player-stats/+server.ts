import { getRowsFromUrlParams } from "$lib/db";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return getRowsFromUrlParams("player_stats", url.searchParams);
}