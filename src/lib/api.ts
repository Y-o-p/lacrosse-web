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
                coach_id: BigInt(row["coach_id"]),
                team_id: BigInt(row["team_id"]),
                last_name: row["last_name"],
                first_name: row["first_name"],
                birth_date: new Date,
                date_created: new Date,
                phone: row["phone"]
            };
            resolve(coach);
        })
        .catch((err) => reject(err));
    });
}

export async function getTeam(id: number): Promise<Team> {
    try {
        const result = await fetch(`/api/teams/${id}`);
        const row = await result.json();
        const team: Team = {
            team_id: BigInt(row["team_id"]),
            team_name: row["team_name"],
            coach_id: BigInt(row["coach_id"])
        }
        return team;
    }
    catch (err) {
        return err;
    }
}

///////////////////////////////////////////////////////////////////////////////
// POST Helper Functions
///////////////////////////////////////////////////////////////////////////////

export async function post(url: string, body: any): Promise<any> {
    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: toJson(body)
        });
        const row = await result.json();
        return row;
    }
    catch (err) {
        return err;
    }
}

/**
 * Will POST scorebook session using the API
 * @param session Should at least contain `coachId`
 * @returns room code string
 */
export async function postScorebookSession(session: Partial<ScorebookSession>): Promise<ScorebookSession> {
    return await post("/api/sessions", session);
}