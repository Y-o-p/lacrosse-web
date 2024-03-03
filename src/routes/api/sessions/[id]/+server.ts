import { deleteSession, getSession } from '$lib/db.js';
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const session = await getSession(Number(params.id));
    return json(session);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    try {
        const id = await deleteSession(Number(params.id));
        return json(id);
    }
    catch (err) {
        return error(500, err);
    }
}