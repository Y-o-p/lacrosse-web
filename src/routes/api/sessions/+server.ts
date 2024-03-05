import { getRandomCode, objFromUrlParams } from '$lib/util.js';
import { deleteRowsFromUrlParams, responseFromFunction, selectRowsFromUrlParams } from '$lib/api_util.js';
import { getRowsFromVals, insertScorebookSession } from '$lib/db.js';
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    return responseFromFunction(async () => {
        const data = await request.json();
        const session: Partial<ScorebookSession> = {
            game_id: data.game_id === undefined ? undefined : BigInt(data.game_id),
            coach_id: BigInt(data.coach_id),
            room_code: data.room_code || getRandomCode(6),
            expire_time: BigInt(data.expire_time || Math.floor(Date.now() / 1000) + 60 * 60)
        }
        return insertScorebookSession(session);
    });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    return selectRowsFromUrlParams("sk_session", url.searchParams);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
    return deleteRowsFromUrlParams("sk_session", url.searchParams);
}