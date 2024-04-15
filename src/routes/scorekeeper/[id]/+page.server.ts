import { goto } from '$app/navigation';
import { getCoach, getGame, getRowsFromVals, getScorebookSessionFromRoomCode, insertPlayerStats } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const roomCode = params.id;
    try {
		const session = await getScorebookSessionFromRoomCode(roomCode);
        const coach = await getCoach(session.coach_id);
        let game = (await getGame(Number(session.game_id))) as Game;
        return {
            props: {
                locals,
                game: game,
                requiredTeam: coach.team_id
            }
        }
    }
    catch {
        throw redirect(303, "/scorekeeper");
    }
}