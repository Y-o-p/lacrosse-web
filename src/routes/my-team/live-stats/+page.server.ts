import { getRowsFromVals, insertPlayerStats} from '$lib/db';

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
			player.playerstat_id = newStats.playerstat_id;
		}
		else {
			player.playerstat_id = stats.playerstat_id;
		}
	});
	
	return {
		props: {
			locals,
			homePlayers: homePlayers,
			awayPlayers: awayPlayers,
			game: 1n
		}
	}
}