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

		// Extract data from form
		const homeTeamId = BigInt(data.get('homeTeamId').toString());
		const home_p1Id = BigInt(data.get('home_p1').toString());
		const home_p2Id = BigInt(data.get('home_p2').toString());
		const home_p3Id = BigInt(data.get('home_p3').toString());
		const home_p4Id = BigInt(data.get('home_p4').toString());
		const home_p5Id = BigInt(data.get('home_p5').toString());
		const home_p6Id = BigInt(data.get('home_p6').toString());
		const home_p7Id = BigInt(data.get('home_p7').toString());
		const home_p8Id = BigInt(data.get('home_p8').toString());
		const home_p9Id = BigInt(data.get('home_p9').toString());
		const home_p10Id = BigInt(data.get('home_p10').toString());


		const awayTeamId = BigInt(data.get('awayTeamId').toString());
		const away_p1Id = BigInt(data.get('away_p1').toString());
		const away_p2Id = BigInt(data.get('away_p2').toString());
		const away_p3Id = BigInt(data.get('away_p3').toString());
		const away_p4Id = BigInt(data.get('away_p4').toString());
		const away_p5Id = BigInt(data.get('away_p5').toString());
		const away_p6Id = BigInt(data.get('away_p6').toString());
		const away_p7Id = BigInt(data.get('away_p7').toString());
		const away_p8Id = BigInt(data.get('away_p8').toString());
		const away_p9Id = BigInt(data.get('away_p9').toString());
		const away_p10Id = BigInt(data.get('away_p10').toString());

		// Array of home team players
		const homeTeamPlayers = [home_p1Id, home_p2Id, home_p3Id, home_p4Id, home_p5Id, home_p6Id, home_p7Id, home_p8Id, home_p9Id, home_p10Id];
		// Array of away team players
		const awayTeamPlayers = [away_p1Id, away_p2Id, away_p3Id, away_p4Id, away_p5Id, away_p6Id, away_p7Id, away_p8Id, away_p9Id, away_p10Id];

		// Log collected form data in console
		console.log("homeTeamId:",homeTeamId);
		console.log("awayTeamId:",awayTeamId);
		//startGame();
	}
}