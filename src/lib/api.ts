import { toJson } from "./util";

///////////////////////////////////////////////////////////////////////////////
// GET Helper Functions
///////////////////////////////////////////////////////////////////////////////

/**
 * Will GET coach using the API
 * @param id The UID of the row
 * @returns `Coach`
 */
export async function getCoach(id: number): Promise<Coach> {
    return new Promise<Coach>((resolve, reject) => {
        fetch(`/api/coaches/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((row) => {
            const coach: Coach = {
                id: BigInt(row["coach_id"]),
                teamId: BigInt(row["team_id"]),
                lastName: row["last_name"],
                firstName: row["first_name"],
                birthdate: new Date,
                createdDate: new Date
            };
            resolve(coach);
        })
        .catch((err) => reject(err));
    });
}

///////////////////////////////////////////////////////////////////////////////
// POST Helper Functions
///////////////////////////////////////////////////////////////////////////////

/**
 * Will POST team stats using the API
 * @param teamStats Should at least contain `teamId`
 * @returns team stats ID
 */
export async function postTeamStats(teamStats: TeamStats | any): Promise<BigInt> {
    return new Promise<BigInt>((resolve, reject) => {
        fetch(`/api/team-stats`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: toJson(teamStats)
        })
        .then((response) => response.json())
        .then((row) => {
            resolve(BigInt(row["teamstats_id"]));
        })
        .catch((err) => reject(err));
    });
}

/**
 * Will POST scorebook session using the API
 * @param session Should at least contain `coachId`
 * @returns room code string
 */
export async function postScorebookSession(session: ScorebookSession | any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        console.log(session);
        fetch(`/api/sessions`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: toJson(session)
        })
        .then((response) => response.json())
        .then((row) => {
            resolve(row["room_code"]);
        })
        .catch((err) => reject(err));
    });
}