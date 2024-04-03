import { getGame, getTeam, getPlayer, getRowsFromVals } from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({locals, params}) {

    let gameRow = await getGame(params.id);
    let homeTeamRow = await getTeam(gameRow["hometeam_id"]);
    let awayTeamRow = await getTeam(gameRow["awayteam_id"]);
    
    let vals: Partial<PlayerStats> = {
        game_id: params.id
    }
    let playerStats = await getRowsFromVals("player_stats", vals);
    let numSats = Object.keys(playerStats).length;

    let homeScore = 0;
    let awayScore = 0;

    let playerStatsTable = [];
    for (let i = 0; i < numSats; i++) {
        let playerRow = await getPlayer(playerStats[i]["player_id"]);
        let playerName = playerRow["first_name"].toString();
        playerName += " ";
        playerName += playerRow["last_name"].toString();

        let teamRow = await getTeam(playerStats[i]["team_id"]);

        let stat: PlayerStatsTable = {
            Player: playerName,
            Team: teamRow["team_name"].toString(),
            Goals: playerStats[i]["goals"],
            Assists: playerStats[i]["assists"],
            Shots: playerStats[i]["shots"],
            "Faceoffs Won": playerStats[i]["faceoffs_won"],
            "Faceoffs Lost": playerStats[i]["faceoffs_lost"],
            Saves: playerStats[i]["saves"],
            "Clears Attempted": playerStats[i]["clears_attempted"],
            "Clears Made": playerStats[i]["clears_made"],
            Penalties: playerStats[i]["penalties"]
        }
        playerStatsTable.push(stat);

        if (gameRow["hometeam_id"] == teamRow["team_id"]) {
            homeScore += playerStats[i]["goals"];
        }

        if (gameRow["awayteam_id"] == teamRow["team_id"]) {
            awayScore += playerStats[i]["goals"];
        }
    }

    let gameTable = [];
    let game: GameTable = {
        "Game Date": gameRow["game_date"].toLocaleDateString(),
        "Game Field": gameRow["game_field"].toString(),
        "Home Team": homeTeamRow["team_name"].toString(),
        "Away Team": awayTeamRow["team_name"].toString(),
        "Home Score": homeScore,
        "Away Score": awayScore
    }
    gameTable.push(game);

    locals.homeTeamData = homeTeamRow;
    locals.awayTeamData = awayTeamRow;
    locals.gameTable = gameTable
    locals.statsTable = playerStatsTable;
    return { locals: locals};
}