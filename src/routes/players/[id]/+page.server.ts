import { getPlayer, getTeam, getRowsFromVals } from "$lib/db";

function checkEmpty(element) {
    let ret = element;
    if (element == "" || element == null) {
        ret = "";
    }
    return ret;
}

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
        Team: checkEmpty(teamRow["team_name"]).toString(),
        Number: playerRow["jersey_num"],
        Position: playerRow["pos"],
        "Height (inches)": playerRow["height"],
        "Weight (pounds)": playerRow["weight"],
        Class: checkEmpty(playerRow["clg_class"]).toString(),
        Major: checkEmpty(playerRow["major"]).toString(),
        "Home Town": checkEmpty(playerRow["home_town"]).toString()
    }
    playerTable.push(player);

    let vals: Partial<PlayerStats> = {
        player_id: BigInt(params.id)
    }

    let playerStatsTable = [];
    let plGoals = 0;
    let plAssists = 0;
    let plPoints = 0;
    let plShots = 0;
    let plSog = 0;
    let plGbs = 0;
    let plTos = 0;
    let plCts = 0;
    let plClrAtmpt = 0;
    let plClrMade = 0;
    let plFoWon = 0;
    let plFoLost = 0;
    let plPenalties = 0;

    let gkStatsTable = [];
    let plGas = 0;
    let plSaves = 0;

    let playerStatRows = await getRowsFromVals("player_stats", vals);
    let numPlayerStats = Object.keys(playerStatRows).length;
    let statsPerGameTable = [];
    let gkStatsPerGameTable = [];
    if (numPlayerStats != 0) {
        for (let i = 0; i < numPlayerStats; i++) {
            let points = playerStatRows[i]["goals"] + playerStatRows[i]["assists"];

            let stats: Partial<PlayerStatsTable> = {
                G: playerStatRows[i]["goals"],
                A: playerStatRows[i]["assists"],
                P: points,
                S: playerStatRows[i]["shots"],
                SOG: playerStatRows[i]["shots_on_goal"],
                GB: playerStatRows[i]["ground_balls"],
                TO: playerStatRows[i]["turnovers"],
                CT: playerStatRows[i]["turnovers_caused"],
                "FO Won": playerStatRows[i]["faceoffs_won"],
                "FO Lost": playerStatRows[i]["faceoffs_lost"],
                CA: playerStatRows[i]["clears_attempted"],
                CM: playerStatRows[i]["clears_made"],
                PEN: playerStatRows[i]["penalties"]
            }
            statsPerGameTable.push(stats);

            plGoals += playerStatRows[i]["goals"];
            plPoints += points;
            plAssists += playerStatRows[i]["assists"];
            plShots += playerStatRows[i]["shots"];
            plSog += playerStatRows[i]["shots_on_goal"];
            plGbs += playerStatRows[i]["ground_balls"];
            plTos += playerStatRows[i]["turnovers"];
            plCts += playerStatRows[i]["turnovers_caused"];
            plClrAtmpt += playerStatRows[i]["clears_attempted"];
            plClrMade += playerStatRows[i]["clears_made"];
            plFoWon += playerStatRows[i]["faceoffs_won"];
            plFoLost += playerStatRows[i]["faceoffs_lost"];
            plPenalties += playerStatRows[i]["penalties"];

            if (playerRow["pos"] == 'G') {

                let gkStats: Partial<GoalieStatsTable> = {
                    GA: playerStatRows[i]["goals_allowed"],
                    Saves: playerStatRows[i]["saves"]
                }
                gkStatsPerGameTable.push(gkStats);

                plGas += playerStatRows[i]["goals_allowed"];
                plSaves += playerStatRows[i]["saves"];
            }
            else {
                gkStatsPerGameTable = null;
            }
        }
    } else {
        statsPerGameTable = null;
        gkStatsPerGameTable = null;
    }

    let playerStats: Partial<PlayerStatsTable> = {
        G: plGoals,
        A: plAssists,
        P: plPoints,
        S: plShots,
        SOG: plSog,
        GB: plGbs,
        TO: plTos,
        CT: plCts,
        "FO Won": plFoWon,
        "FO Lost": plFoLost,
        CA: plClrAtmpt,
        CM: plClrMade,
        PEN: plPenalties
    }
    playerStatsTable.push(playerStats);

    if (playerRow["pos"] == 'G') {
        let gkStats: Partial<GoalieStatsTable> = {
            GA: plGas,
            Saves: plSaves
        }
        gkStatsTable.push(gkStats);
    }
    else {
        gkStatsTable = null;
    }

    locals.playerData = playerRow;
    locals.playerTable = playerTable;
    locals.gamesStats = statsPerGameTable;
    locals.playerStats = playerStatsTable;
    locals.gkGamesStats = gkStatsPerGameTable;
    locals.gkStats = gkStatsTable;
    return { locals: locals};
}