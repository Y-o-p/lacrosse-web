import { getRowsFromVals, getTeam, getGameStats} from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {

    let gameRows = await getRowsFromVals("games", "");
    let numGames = Object.keys(gameRows).length;
    let games = [];
    const gamesRouteData: Array<Map<string, number>> = [];

    for (let i = 0; i < numGames; i++) {
        let homeTeamRow = await getTeam(gameRows[i]["hometeam_id"]);
        let awayTeamRow = await getTeam(gameRows[i]["awayteam_id"]);
        if (homeTeamRow === undefined || awayTeamRow === undefined) {
            continue;
        }

        let homeScore = 0;
        let homeStatsRow = await getGameStats(gameRows[i]["game_id"], gameRows[i]["hometeam_id"]);
        for (let j = 0; j < Object.keys(homeStatsRow).length; j++) {
            homeScore += homeStatsRow[j]["goals"];
        }

        let awayScore = 0;
        let awayStatsRow = await getGameStats(gameRows[i]["game_id"], gameRows[i]["awayteam_id"]);
        for (let j = 0; j < Object.keys(awayStatsRow).length; j++) {
            awayScore += awayStatsRow[j]["goals"];
        }

        let gameStr = awayTeamRow["team_name"].toString();
        gameStr += " vs. ";
        gameStr += homeTeamRow["team_name"].toString();

        let game: Partial<GameTable> = {
            "Game": gameStr,
            "Date": gameRows[i]["game_date"].toLocaleDateString(),
            "Location": gameRows[i]["game_field"].toString(),
            "Home Team": homeTeamRow["team_name"].toString(),
            "Away Team": awayTeamRow["team_name"].toString(),
            "Home Score": homeScore,
            "Away Score": awayScore
        }
        games.push(game);

        let gamesRouteMap = new Map<string, number>();
        gamesRouteMap.set(gameStr, gameRows[i]["game_id"]);
        gamesRouteMap.set(homeTeamRow["team_name"].toString(), homeTeamRow["team_id"]);
        gamesRouteMap.set(awayTeamRow["team_name"].toString(), awayTeamRow["team_id"]);
        gamesRouteData.push(gamesRouteMap);
    }

    locals.games = games;
    locals.gamesRouteData = gamesRouteData;
    return { locals: locals};   
}