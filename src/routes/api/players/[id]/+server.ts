import { responseFromFunction } from '$lib/api_util.js';
import { deletePlayer, getPlayer } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getPlayer(Number(params.id));
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deletePlayer(Number(params.id));
    })
}