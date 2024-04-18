import { getRowsFromVals, getTeam } from "$lib/db";

function checkEmpty(element) {
    let ret = element;
    if (element == "" || element == null) {
        ret = "-";
    }
    return ret;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    let playerRows = await getRowsFromVals("players", "");
    let numPlayers = Object.keys(playerRows).length;
    let players = [];
    const plyrsRouteData: Array<Map<string, number>> = [];


    for (let i = 0; i < numPlayers; i++) {

        let teamRow = await getTeam(playerRows[i]["team_id"]);

        let playerName = "";
        playerName += playerRows[i]["first_name"].toString();
        playerName += " ";
        playerName += playerRows[i]["last_name"].toString();

        let player: PlayerTable = {
            Name: playerName,
            Team: checkEmpty(teamRow["team_name"]).toString(),
            '#': playerRows[i]["jersey_num"],
            Position: playerRows[i]["pos"],
            "Height (inches)": playerRows[i]["height"],
            "Weight (pounds)": playerRows[i]["weight"],
            Class: checkEmpty(playerRows[i]["clg_class"]).toString(),
            Major: checkEmpty(playerRows[i]["major"]).toString(),
            "Home Town": checkEmpty(playerRows[i]["home_town"]).toString()
        }
        players.push(player);

        let plyrsRouteMap = new Map<string, number>();
        plyrsRouteMap.set(playerName, playerRows[i]["player_id"]);
        plyrsRouteMap.set(teamRow["team_name"].toString(), playerRows[i]["team_id"]);
        plyrsRouteData.push(plyrsRouteMap);
    }

    locals.players = players;
    locals.plyrsRouteData = plyrsRouteData;
    return { locals: locals };
}