import { getPlayer, getTeam, getRowsFromVals } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({locals, params}) {
    let playerRow = await getPlayer(params.id);
    let teamRow = await getTeam(playerRow["team_id"]);

    let playerName = playerRow["first_name"].toString();
    playerName += " ";
    playerName += playerRow["last_name"].toString();
    let playerTable = [];
    
    let player: PlayerTable = {
        Name: playerName,
        Team: teamRow["team_name"].toString(),
        "Jersey Number": playerRow["jersey_num"],
        Position: playerRow["pos"].toString(),
        "Height (inches)": playerRow["height"],
        "Weight (pounds)": playerRow["weight"],
        "Date of Birth": playerRow["birth_date"].toLocaleDateString(),
    }
    playerTable.push(player);

    let vals: Partial<PlayerStats> = {
        player_id: BigInt(params.id)
    }

    let playerStatsTable = [];
    let plGoals = 0;
    let plAssists = 0;
    let plShots = 0;
    let plFoWon = 0;
    let plFoLost = 0;
    let plSaves = 0;
    let plClrAtmpt = 0;
    let plClrMade = 0;
    let plPenalties = 0;

    let playerStatRows = await getRowsFromVals("player_stats", vals);
    let numPlayerStats = Object.keys(playerStatRows).length;
    let statsPerGameTable = [];
    if (numPlayerStats != 0) {
        for (let i = 0; i < numPlayerStats; i++) {
            let stats: Partial<PlayerStatsTable> = {
                Goals: playerStatRows[i]["goals"],
                Assists: playerStatRows[i]["assists"],
                Shots: playerStatRows[i]["shots"],
                "Faceoffs Won": playerStatRows[i]["faceoffs_won"],
                "Faceoffs Lost": playerStatRows[i]["faceoffs_lost"],
                Saves: playerStatRows[i]["saves"],
                "Clears Attempted": playerStatRows[i]["clears_attempted"],
                "Clears Made": playerStatRows[i]["clears_made"],
                Penalties: playerStatRows[i]["penalties"]
            }
            statsPerGameTable.push(stats);

            plGoals += playerStatRows[i]["goals"];
            plAssists += playerStatRows[i]["assists"];
            plShots += playerStatRows[i]["shots"];
            plFoWon += playerStatRows[i]["faceoffs_won"];
            plFoLost += playerStatRows[i]["faceoffs_lost"];
            plSaves += playerStatRows[i]["saves"];
            plClrAtmpt += playerStatRows[i]["clears_attempted"];
            plClrMade += playerStatRows[i]["clears_made"];
            plPenalties += playerStatRows[i]["penalties"];
        }
    } else {
        statsPerGameTable = null;
    }

    let playerStats: Partial<PlayerStatsTable> = {
        Goals: plGoals,
        Assists: plAssists,
        Shots: plShots,
        "Faceoffs Won": plFoWon,
        "Faceoffs Lost": plFoLost,
        Saves: plSaves,
        "Clears Attempted": plClrAtmpt,
        "Clears Made": plClrMade,
        Penalties: plPenalties
    }
    playerStatsTable.push(playerStats);

    locals.playerData = playerRow;
    locals.playerTable = playerTable;
    locals.gamesStats = statsPerGameTable;
    locals.playerStats = playerStatsTable;
    return { locals: locals};
}