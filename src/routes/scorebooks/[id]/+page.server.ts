import { goto } from '$app/navigation';
import { getGame, getRowsFromVals, insertPlayerStats } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (locals.coach.team_id !== undefined) {
        const game_id = BigInt(params.id);
        try {
            let game = (await getGame(Number(game_id))) as Game;
            return {
                props: {
                    locals,
                    game: game
                }
            }
        }
        catch {
            throw redirect(303, "/scorebooks");
        }
    }
    throw redirect(303, "/");
}