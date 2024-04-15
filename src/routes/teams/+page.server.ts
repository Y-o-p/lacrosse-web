import { getRowsFromVals, getCoach } from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    let teamRows = await getRowsFromVals("teams", "");
    let numTeams = Object.keys(teamRows).length;
    let teams = [];
    const teamsRouteData: Array<Map<string, number>> = [];

    for (let i = 0; i < numTeams; i++) {

        let coachRow = await getCoach(teamRows[i]["coach_id"]);
        let coachName = "";
        coachName += coachRow["first_name"].toString();
        coachName += " "
        coachName += coachRow["last_name"].toString();

        let team: TeamTable = {
            Team: teamRows[i]["team_name"].toString(),
            Coach: coachName,
            Wins: teamRows[i]["wins"],
            Losses: teamRows[i]["losses"]
        }
        teams.push(team);

        let teamsRouteMap = new Map<string, number>();
        teamsRouteMap.set(teamRows[i]["team_name"].toString(), teamRows[i]["team_id"]);
        teamsRouteData.push(teamsRouteMap);
    }
    locals.teams = teams;
    locals.teamsRouteData = teamsRouteData;
    return { locals: locals};
}