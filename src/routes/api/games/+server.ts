import { deleteRowsFromUrlParams, responseFromFunction, selectRowsFromUrlParams } from '$lib/api_util.js';
import { insertGame } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    return responseFromFunction(async () => {
        const data = await request.json();
        const game = data as Game;
        return insertGame(game);
    });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return selectRowsFromUrlParams("games", url.searchParams);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
    return deleteRowsFromUrlParams("games", url.searchParams);
}