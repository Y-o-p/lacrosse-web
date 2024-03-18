import { responseFromFunction } from '$lib/api_util.js';
import { deleteGame, getGame } from '$lib/db.js';

export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getGame(Number(params.id));
    });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deleteGame(Number(params.id));
    });
}
