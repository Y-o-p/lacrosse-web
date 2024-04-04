import { getPlayersByTeamId, getAllTeams} from '$lib/db';
import { goto } from '$app/navigation';
import type { Shot } from '$lib/scorebook';


/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const teamNames = await getAllTeams();

	// Initialize a 2D array to store players
    const allPlayers = [];

    // Loop through each team to get its players
    for (const team of teamNames) {
        const players = await getPlayersByTeamId(BigInt(team.team_id));
        allPlayers.push(players);
    }
	

	
	return {
		props: {
			locals,
			allPlayers: allPlayers,
            teamNames: teamNames
		}
	}
}

//async function startGame() {
//	await goto(`/my-team/live-stats`);
//}

export const actions = {
	StartGame: async ({ request }) => {
		// Wait for form data
		const data = await request.formData();

		const homeTeamId = BigInt(data.get('homeTeamId').toString());
		const awayTeamId = BigInt(data.get('awayTeamId').toString());
		// Array of home team players
		const homeTeamPlayers_ids = data.get('homePlayersIds');

		// Array of away team players
		const awayTeamPlayers_ids = data.get('awayPlayersIds');

		// Log collected form data in console
		console.log("homeTeamPlayers:",homeTeamPlayers_ids);
		console.log("awayTeamPlayers:",awayTeamPlayers_ids);

		// Log collected form data in console
		console.log("homeTeamId:",homeTeamId);
		console.log("awayTeamId:",awayTeamId);
		//startGame();
	}
}