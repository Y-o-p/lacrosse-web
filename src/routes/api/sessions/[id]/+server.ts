import { getSession } from '$lib/db.js';
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const session = await getSession(Number(params.id));
    return json(session);
}

