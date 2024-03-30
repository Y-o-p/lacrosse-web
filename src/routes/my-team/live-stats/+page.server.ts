import { apiCall } from '$lib/api.js';
import { getPlayersByTeamId, getRowsFromVals, insertPlayerStats} from '$lib/db';
import type { Shot } from '$lib/scorebook';


/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const homePlayers = await getRowsFromVals("players", { team_id: BigInt(locals.coach.team_id) });
	const awayPlayers = await getRowsFromVals("players", { team_id: BigInt(2) });

	let playerStats = await getRowsFromVals("player_stats", { game_id: 1, team_id: locals.coach.team_id });
	playerStats = playerStats.concat(await getRowsFromVals("player_stats", { game_id: 1, team_id: 2 }));

	[...homePlayers, ...awayPlayers].forEach(async (player) => {
		const stats = playerStats.find((stats) => player.player_id == stats.player_id);
		if (stats === undefined) {
			const newStats = await insertPlayerStats({
				game_id: 1n,
				player_id: player.player_id,
				team_id: player.team_id
			});
			player.playerstat_id = BigInt(newStats.playerstat_id);
		}
		else {
			player.playerstat_id = BigInt(stats.playerstat_id);
		}
	});

	console.log([...homePlayers, ...awayPlayers]);

	/**let player_statsInserted = false;
	if (!player_statsInserted) {
		await insertPlayer_Stats(BigInt(locals.coach.team_id));
		player_statsInserted = true;
	}*/
	
	return {
		props: {
			locals,
			homePlayers: homePlayers,
			awayPlayers: awayPlayers,
			game: 1n
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
	},

	Clear: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const clear_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');

		if (buttonClicked == "Unsuccessful Clear") {
			console.log("Clear Attempted By:", clear_playerId);
		} else if (buttonClicked == "Successful Clear") {
			console.log("Clear Made By:", clear_playerId);
		}
	},

	Faceoff: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const home_playerId = data.get('offensivePlayer').toString();
		const away_playerId = data.get('defensivePlayer').toString();
		const buttonClicked = data.get('button');

		// Log collected form data in console
		console.log("Faceoff Home Player::", home_playerId);
		console.log("Faceoff Away Player::", away_playerId);
		console.log("Button clicked:", buttonClicked); // "Complete Faceoff"
	},

	Penalty: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const penalty_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');
		const penalty_duration = data.get('penaltyTime');

		// Log collected form data in console
		console.log("Penalty Player:", penalty_playerId);
		console.log("Penalty Duration:", penalty_duration);
		console.log("Button clicked:", buttonClicked); // "Complete Penalty"
	},

	Groundball: async ({ request }) => {
		const data = await request.formData();
		
		// Extract data from form
		const recoveringPlayer_playerId = data.get('offensivePlayer').toString();
		const buttonClicked = data.get('button');

		// Log collected form data in console
		console.log("Picked up by:", recoveringPlayer_playerId);
		console.log("Button clicked:", buttonClicked); // "Complete Penalty"
	}

};