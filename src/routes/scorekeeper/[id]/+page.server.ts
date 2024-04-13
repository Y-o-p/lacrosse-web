import { goto } from '$app/navigation';
import { getGame, getRowsFromVals, getScorebookSessionFromRoomCode, insertPlayerStats } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const roomCode = params.id;
    try {
		const session = await getScorebookSessionFromRoomCode(roomCode);
        let game = (await getGame(Number(session.game_id))) as Game;
        return {
            props: {
                locals,
                game: game
            }
        }
    }
    catch {
        throw redirect(303, "/scorekeeper");
    }
}