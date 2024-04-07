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

    let homePlayerStatsTable = [];
    let awayPlayerStatsTable = [];
    let homeGkStatsTable = [];
    let awayGkStatsTable = [];
    for (let i = 0; i < numSats; i++) {
        let playerRow = await getPlayer(playerStats[i]["player_id"]);
        let playerName = playerRow["first_name"].toString();
        playerName += " ";
        playerName += playerRow["last_name"].toString();
        let points = playerStats[i]["goals"] + playerStats[i]["assists"];

        let teamRow = await getTeam(playerStats[i]["team_id"]);

        let stat: Partial<PlayerStatsTable> = {
            '#': playerRow["jersey_num"],
            Player: playerName,
            G: playerStats[i]["goals"],
            A: playerStats[i]["assists"],
            P: points,
            S: playerStats[i]["shots"],
            SOG: playerStats[i]["shots_on_goal"],
            GB: playerStats[i]["ground_balls"],
            TO: playerStats[i]["turnovers"],
            CT: playerStats[i]["turnovers_caused"],
            "FO Won": playerStats[i]["faceoffs_won"],
            "FO Lost": playerStats[i]["faceoffs_lost"],
            PEN: playerStats[i]["penalties"]
        }
        if (playerRow["team_id"] == gameRow["hometeam_id"]) {
            homePlayerStatsTable.push(stat);
            homeScore += playerStats[i]["goals"];

            if (playerRow["pos"] == 'G') {
                if (playerStats[i]["saves"] > 0 || playerStats[i]["goals_allowed"] > 0) {
                    let gkStats: Partial<GoalieStatsTable> = {
                        GA: playerStats[i]["goals_allowed"],
                        Saves: playerStats[i]["saves"]
                    }
                    homeGkStatsTable.push(gkStats);
                } else {
                    //console.log(playerStats[i]["player_id"]);
                }
            }
        } else if (playerRow["team_id"] == gameRow["awayteam_id"]) {
            awayPlayerStatsTable.push(stat);
            awayScore += playerStats[i]["goals"];

            if (playerRow["pos"] == 'G') {
                if (playerStats[i]["saves"] > 0 || playerStats[i]["goals_allowed"] > 0) {
                    let gkStats: Partial<GoalieStatsTable> = {
                        GA: playerStats[i]["goals_allowed"],
                        Saves: playerStats[i]["saves"]
                    }
                    awayGkStatsTable.push(gkStats);
                }
            }
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
    locals.homeStatsTable = homePlayerStatsTable;
    locals.awayStatsTable = awayPlayerStatsTable;
    locals.homeGkStatsTable = homeGkStatsTable;
    locals.awayGkStatsTable = awayGkStatsTable;
    return { locals: locals};
}