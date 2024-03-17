import { getPlayersByTeamId } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const homePlayers = await getPlayersByTeamId(BigInt(locals.coach.team_id));
	return {
		props: {
			locals,
			homePlayers: homePlayers
		}
	}
}