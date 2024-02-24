

// /** @type {import('./$types').PageServerLoad} */
// export async function load({ }) {
// 	return {
// 		post: await db.getPost(params.slug)
// 	};
// }

import { pool } from '$lib/db.js';

/** @type {import('./$types').Actions} */
export const actions = {
	createScorebook: async (event) => {
        const data = await event.request.formData();
    }
};
