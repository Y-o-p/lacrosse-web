import { getPlayersByTeamId, insertPlayer_Stats } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const homePlayers = await getPlayersByTeamId(BigInt(locals.coach.team_id));
	const awayPlayers = await getPlayersByTeamId(BigInt(2));

	let player_statsInserted = false;
	if (!player_statsInserted) {
		await insertPlayer_Stats(BigInt(locals.coach.team_id));
		player_statsInserted = true;
	}
	
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
		let assister_playerId; // May or May not exist (I.e. if no savee is selected/shot made)
		let savee_playerId; // May or May not exist (I.e. if no savee is selected/shot made)
		
		// If not null, set savee_playerId
		if (data.get('defensivePlayer') != "") {
			savee_playerId = data.get('defensivePlayer').toString();
		}

		// If not null, set assister_playerId
		if (data.get('offensivePlayerSecondary') != "") {
			assister_playerId = data.get('offensivePlayerSecondary').toString();
		}
		

		// Log collected form data in console
		console.log("Button clicked:", buttonClicked);
		console.log("shooter playerID:",shooter_playerId);
		console.log("assister playerID:", assister_playerId);
		console.log("Savee playerID:", savee_playerId);
		
		

		// TODO: UPDATE data in player_stats table for selected players
		
		// if buttonClicked == "Shot Saved", Then
		// increment shots by 1 for shooter
		// increment saves by 1 for savee

		// if buttonClicked == "Shot Missed/Wide", Then
		// increment shots by 1 for shooter

		// if buttonClicked == "Shot Made", then
		// increment shots by 1 for shooter
		// increment goals by 1 for shooter

		
	},

	Turnover: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const playerWhichLostPosession_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');
		let playerWhichCausedTurnover_playerId;

		// If not null, set player that caused turnover
		if (data.get('defensivePlayer').toString() != "") {
			playerWhichCausedTurnover_playerId = data.get('defensivePlayer').toString();

			console.log("Turnover Caused By:", playerWhichCausedTurnover_playerId);
		}
		console.log("Turnover Made by:", playerWhichLostPosession_playerId);
		console.log("Button clicked:", buttonClicked); // "Complete Turnover"
	}


};