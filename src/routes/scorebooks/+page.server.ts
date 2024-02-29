import { getGamesWithCoach } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	let gamesWithCoach = await getGamesWithCoach(Number(locals.coach.coach_id));
	let games: Array<Game> = [];
	for (let game of gamesWithCoach) {
		games.push({
			game_id: game.game_id,
			hometeam_id: game.hometeam_id,
			awayteam_id: game.awayteam_id,
			game_date: game.game_date
		});
	}
	return {
		locals: locals,
		games: games
	}
}