import { getScorebookSessionFromRoomCode, getGame } from "$lib/db";
import { redirect, type Actions } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: any) => {
		const data = await event.request.formData();

		const roomCode = data.get('code');
		console.log("ROOM CODE", roomCode);
		const session = await getScorebookSessionFromRoomCode(roomCode);

		const game = await getGame(session.game_id);

		// Update game to unpublished

		console.log(game);
		
		// Go to scorebook route
		await redirect(303, `/scorekeeper/edit/${game.game_id}`);
	},
} as Actions;
