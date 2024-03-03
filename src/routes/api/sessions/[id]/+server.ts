import { responseFromFunction } from '$lib/api_util.js';
import { deleteScorebookSession, getScorebookSession } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getScorebookSession(Number(params.id));
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deleteScorebookSession(Number(params.id));
    })
}