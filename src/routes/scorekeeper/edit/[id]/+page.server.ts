import { getGame, getRowsFromVals } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    // Get game from game id passed through url
    const game = await getGame(Number(params.id));

    console.log(game);
    console.log(params.id);

    // Get player stats for each team based on game id and team id.
    const homeTeamStats = await getRowsFromVals("player_stats", { game_id: game.game_id, team_id: game.hometeam_id });
    const awayTeamStats = await getRowsFromVals("player_stats", { game_id: game.game_id, team_id: game.awayteam_id });

    console.log(homeTeamStats);

    let playerStatsTable = [];

    for (let i = 0; i < homeTeamStats.length; i++) {
        let playerRow = await getRowsFromVals("players", { player_id: homeTeamStats[i]["player_id"] });
        let playerName = playerRow[0]["first_name"].toString();
        playerName += " ";
        playerName += playerRow[0]["last_name"].toString();

        let stat: PlayerStatsTable = {
            Player: playerName,
            Goals: homeTeamStats[i]["goals"],
            Assists: homeTeamStats[i]["assists"],
            Shots: homeTeamStats[i]["shots"],
            "Faceoffs Won": homeTeamStats[i]["faceoffs_won"],
            "Faceoffs Lost": homeTeamStats[i]["faceoffs_lost"],
            Saves: homeTeamStats[i]["saves"],
            "Clears Attempted": homeTeamStats[i]["clears_attempted"],
            "Clears Made": homeTeamStats[i]["clears_made"],
            Penalties: homeTeamStats[i]["penalties"],
            Team: ""
        }
        playerStatsTable.push(stat);
    }
    console.log(playerStatsTable);


    
	return {
		locals: locals,
        slug: params.id,
        game: game,
        homeTeamStats: playerStatsTable,
        awayTeamStats: awayTeamStats
	}
}