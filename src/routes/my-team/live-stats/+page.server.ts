import { getPlayersByTeamId } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const homePlayers = await getPlayersByTeamId(BigInt(locals.coach.team_id));
	const awayPlayers = await getPlayersByTeamId(BigInt(2));
	return {
		props: {
			locals,
			homePlayers: homePlayers,
			awayPlayers: awayPlayers
		}
	}
}

export const actions = {
	ShotAttempt: async ({ request }) => {
		const data = await request.formData();

		// Extract data from form
		const shooter_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');
		let savee_playerId; // May or May not exist (I.e. if no savee is selected/shot made)
		
		// If not null, set savee_playerId
		if (data.get('defensivePlayer') != "") {
			savee_playerId = data.get('defensivePlayer').toString();
		}
		

		// Log collected form data in console
		console.log("Savee playerID:", savee_playerId);
		console.log("shooter playerID:",shooter_playerId);
		console.log("Button clicked:", buttonClicked);

		// TODO: Insert data into player_stats table
		/**let player_stats = {
			player_id: 



		};*/
	},

	Turnover: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const playerWhichLostPosession_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');
		let playerWhichCausedTurnover_playerId;

		if (data.get('defensivePlayer').toString() != "") {
			playerWhichCausedTurnover_playerId = data.get('defensivePlayer').toString();
			console.log("Turnover Caused By:", playerWhichCausedTurnover_playerId);
		}
		console.log("Turnover Made by:", playerWhichLostPosession_playerId);
		console.log("Button clicked:", buttonClicked); // "Complete Turnover"
	}


};