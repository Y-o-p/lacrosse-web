import { getGame, getRowsFromVals } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {

    // Get game from game id passed through url
    const game = await getGame(Number(params.id));

    // Get player stats for each team based on game id and team id.
    const homeTeamStats = await getRowsFromVals("player_stats", { game_id: game.game_id, team_id: game.hometeam_id });
    const awayTeamStats = await getRowsFromVals("player_stats", { game_id: game.game_id, team_id: game.awayteam_id });

    let homePlayerStats = [];
    let awayPlayerStats = [];

    

    for (let i = 0; i < homeTeamStats.length; i++) {
        let playerRow = await getRowsFromVals("players", { player_id: homeTeamStats[i]["player_id"] });
        let playerName = playerRow[0]["first_name"].toString();
        playerName += " ";
        playerName += playerRow[0]["last_name"].toString();

        let stat: PlayerStats = {
            Player: playerName,
            playerstat_id: BigInt(homeTeamStats[i]["playerstat_id"]),
            player_id: BigInt(homeTeamStats[i]["player_id"]),
            goals: homeTeamStats[i]["goals"],
            assists: homeTeamStats[i]["assists"],
            shots: homeTeamStats[i]["shots"],
            shots_on_goal: homeTeamStats[i]["shots_on_goal"],
            ground_balls: homeTeamStats[i]["ground_balls"],
            turnovers: homeTeamStats[i]["turnovers"],
            turnovers_caused: homeTeamStats[i]["turnovers_caused"],
            faceoffs_won: homeTeamStats[i]["faceoffs_won"],
            faceoffs_lost: homeTeamStats[i]["faceoffs_lost"],
            saves: homeTeamStats[i]["saves"],
            clears_attempted : homeTeamStats[i]["clears_attempted"],
            clears_made: homeTeamStats[i]["clears_made"],
            penalties: homeTeamStats[i]["penalties"],
            goals_allowed: homeTeamStats[i]["goals_allowed"],
            team_id: BigInt(homeTeamStats[i]["team_id"]),
        }
        homePlayerStats.push(stat);
    }
    //console.log(homePlayerStats[1]);

    for (let i = 0; i < awayTeamStats.length; i++) {
        let playerRow = await getRowsFromVals("players", { player_id: awayTeamStats[i]["player_id"] });
        let playerName = playerRow[0]["first_name"].toString();
        playerName += " ";
        playerName += playerRow[0]["last_name"].toString();

        let stat: PlayerStatsTable = {
            Player: playerName,
            playerstat_id: BigInt(awayTeamStats[i]["playerstat_id"]),
            Goals: awayTeamStats[i]["goals"],
            Assists: awayTeamStats[i]["assists"],
            Shots: awayTeamStats[i]["shots"],
            Shots_On_Goal: awayTeamStats[i]["shots_on_goal"],
            Ground_Balls: awayTeamStats[i]["ground_balls"],
            Turnovers: awayTeamStats[i]["turnovers"],
            Turnovers_Caused: awayTeamStats[i]["turnovers_caused"],

            Faceoffs_Won: awayTeamStats[i]["faceoffs_won"],
            Faceoffs_Lost: awayTeamStats[i]["faceoffs_lost"],
            Saves: awayTeamStats[i]["saves"],
            Clears_Attempted : awayTeamStats[i]["clears_attempted"],
            Clears_Made: awayTeamStats[i]["clears_made"],
            Penalties: awayTeamStats[i]["penalties"],
            Goals_Allowed: awayTeamStats[i]["goals_allowed"],
        }
        awayPlayerStats.push(stat);
    }
    //console.log(awayPlayerStats[1]);




    
	return {
		locals: locals,
        slug: params.id,
        game: game,
        homeTeamStats: homePlayerStats,
        awayTeamStats: awayPlayerStats
	}
}