import { responseFromFunction } from '$lib/api_util.js';
import { deleteCoach, getCoach } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getCoach(Number(params.id));
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deleteCoach(Number(params.id));
    })
}