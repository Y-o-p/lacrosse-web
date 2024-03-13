import { getPlayersByTeamId } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const homePlayers = await getPlayersByTeamId(BigInt(1));
	return {
		props: {
			locals,
			homePlayers: homePlayers
		}
	}
}