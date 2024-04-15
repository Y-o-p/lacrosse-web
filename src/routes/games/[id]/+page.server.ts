import { getGame, getTeam, getPlayer, getRowsFromVals } from "$lib/db"

function checkNull(element) {
    if (element == null) {
        return "-";
    } else {
        return element;
    }
}

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

    // Initialize Tables
    let homePlayerStatsTable = [];
    let awayPlayerStatsTable = [];
    let homeGkStatsTable = [];
    let awayGkStatsTable = [];
    let gameTable = [];

    // Initialize Route Maps
    const homePlyrsRouteData: Array<Map<string, number>> = [];
    const awayPlyrsRouteData: Array<Map<string, number>> = [];
    const homeGKRouteData: Array<Map<string, number>> = [];
    const awayGKRouteData: Array<Map<string, number>> = [];
    const gameRouteData: Array<Map<string, number>> = [];

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

            let homePlyrRouteMap = new Map<string, number>();
            homePlyrRouteMap.set(playerName, playerStats[i]["player_id"]);
            homePlyrsRouteData.push(homePlyrRouteMap);

            homeScore += playerStats[i]["goals"];

            if (playerRow["pos"] == 'G') {
                if (playerStats[i]["saves"] > 0 || playerStats[i]["goals_allowed"] > 0) {
                    let gkStats: GoalieStatsTable = {
                        "#": playerRow["jersey_num"],
                        Player: playerName,
                        GA: playerStats[i]["goals_allowed"],
                        Saves: playerStats[i]["saves"]
                    }
                    homeGkStatsTable.push(gkStats);

                    let homeGkRouteMap = new Map<string, number>();
                    homeGkRouteMap.set(playerName, playerStats[i]["player_id"]);
                    homeGKRouteData.push(homeGkRouteMap);
                }
            }
        } else if (playerRow["team_id"] == gameRow["awayteam_id"]) {
            awayPlayerStatsTable.push(stat);

            let awayPlyrRouteMap = new Map<string, number>();
            awayPlyrRouteMap.set(playerName, playerStats[i]["player_id"]);
            awayPlyrsRouteData.push(awayPlyrRouteMap);

            awayScore += playerStats[i]["goals"];

            if (playerRow["pos"] == 'G') {
                if (playerStats[i]["saves"] > 0 || playerStats[i]["goals_allowed"] > 0) {
                    let gkStats: GoalieStatsTable = {
                        "#": playerRow["jersey_num"],
                        Player: playerName,
                        GA: playerStats[i]["goals_allowed"],
                        Saves: playerStats[i]["saves"]
                    }
                    awayGkStatsTable.push(gkStats);

                    let awayGkRouteMap = new Map<string, number>();
                    awayGkRouteMap.set(playerName, playerStats[i]["player_id"]);
                    awayGKRouteData.push(awayGkRouteMap);
                }
            }
        }
    }
    
    let game: Partial<GameTable> = {
        "Date": gameRow["game_date"].toLocaleDateString(),
        "Location": checkNull(gameRow["game_field"]).toString(),
        "Home Team": checkNull(homeTeamRow["team_name"]).toString(),
        "Away Team": checkNull(awayTeamRow["team_name"]).toString(),
        "Home Score": homeScore,
        "Away Score": awayScore,
        REFS: checkNull(gameRow["refs"]),
        TKS: checkNull(gameRow["timekeepers"]).toString(),
        SKS: checkNull(gameRow["scorekeepers"]).toString(),
    }
    gameTable.push(game);

    let gameRouteMap = new Map<string, number>();
    gameRouteMap.set(homeTeamRow["team_name"].toString(), homeTeamRow["team_id"]);
    gameRouteMap.set(awayTeamRow["team_name"].toString(), awayTeamRow["team_id"]);
    gameRouteData.push(gameRouteMap);

    // Local Data
    locals.homeTeamData = homeTeamRow;
    locals.awayTeamData = awayTeamRow;

    // Local Table Data
    locals.gameTable = gameTable
    locals.homeStatsTable = homePlayerStatsTable;
    locals.awayStatsTable = awayPlayerStatsTable;
    locals.homeGkStatsTable = homeGkStatsTable;
    locals.awayGkStatsTable = awayGkStatsTable;

    //Local Route Data
    locals.gameRouteData = gameRouteData;
    locals.homePlyrsRouteData = homePlyrsRouteData;
    locals.awayPlyrsRouteData = awayPlyrsRouteData;
    locals.homeGKRouteData = homeGKRouteData;
    locals.awayGKRouteData = awayGKRouteData;

    return { locals: locals};
}