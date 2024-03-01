import { getGamesWithCoach } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	return {
		locals: locals
	}
}