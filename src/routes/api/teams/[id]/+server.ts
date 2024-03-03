import { responseFromFunction } from '$lib/api_util.js';
import { deleteTeam, getTeam } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getTeam(Number(params.id));
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deleteTeam(Number(params.id));
    })
}