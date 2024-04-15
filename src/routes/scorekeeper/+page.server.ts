import { redirect, type Actions } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: any) => {
		const data = await event.request.formData();

		const roomCode = data.get('code');
		console.log("ROOM CODE", roomCode);
		
		// Go to scorebook route
		await redirect(303, `/scorekeeper/${roomCode}`);
	},
} as Actions;
