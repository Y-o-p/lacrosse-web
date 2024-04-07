import { getTeam, getCoach, getRowsFromVals } from "$lib/db"

function checkEmpty(element) {
    let ret = element;
    if (element == "" || element == null) {
        ret = "";
    }
    return ret;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({locals, params}) {
    
    let teamRow = await getTeam(params.id);
    let coachRow = await getCoach(teamRow["coach_id"]);
    let coachName = "";
    coachName += coachRow["first_name"].toString();
    coachName += " ";
    coachName += coachRow["last_name"].toString();
    let teamTable = [];

    let team : TeamTable = {
        Team: teamRow["team_name"].toString(),
        Coach: coachName,
        Wins: teamRow["wins"],
        Losses: teamRow["losses"],
    }
    teamTable.push(team)

    let player: Partial<Player> = {
        team_id: BigInt(params.id)
    }

    let playerRows = await getRowsFromVals("players", player);
    let numPlayers = Object.keys(playerRows).length;
    let playersTable = [];
    for (let i = 0; i < numPlayers; i++) {

        let playerName = "";
        playerName += playerRows[i]["first_name"].toString();
        playerName += " ";
        playerName += playerRows[i]["last_name"].toString();

        let player: Partial<PlayerTable> = {
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
        playersTable.push(player);
    }

    locals.teamData = teamRow;
    locals.teamTable = teamTable;
    locals.roster = playersTable;
    return { locals: locals};
}