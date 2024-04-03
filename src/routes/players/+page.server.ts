import { getRowsFromVals, getTeam } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    let playerRows = await getRowsFromVals("players", "");
    let numPlayers = Object.keys(playerRows).length;
    let players = [];

    for (let i = 0; i < numPlayers; i++) {

        let teamRow = await getTeam(playerRows[i]["team_id"]);

        let playerName = "";
        playerName += playerRows[i]["first_name"].toString();
        playerName += " ";
        playerName += playerRows[i]["last_name"].toString();

        let player: PlayerTable = {
            Name: playerName,
            Team: teamRow["team_name"].toString(),
            "Jersey Number": playerRows[i]["jersey_num"],
            Position: playerRows[i]["pos"],
            "Height (inches)": playerRows[i]["height"],
            "Weight (pounds)": playerRows[i]["weight"],
            "Date of Birth": playerRows[i]["birth_date"].toLocaleDateString()
        }
        players.push(player);
    }

    locals.players = players;
    return { locals: locals };
}