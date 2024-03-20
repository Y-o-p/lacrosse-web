// These are API helper functions. They are provided to avoid fetch calls.
// You can use these in server and client side content.

import { toJson } from "./util";

export async function apiCall(method: string, url: string, body: any): Promise<any> {
    try {
        const result = await fetch(url, {
            method: method,
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
                phone: row["phone"],
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

export async function apiPost(url: string, body: any): Promise<any> {
    return await apiCall("POST", url, body);
}

/**
 * Will POST scorebook session using the API
 * @param session Should at least contain `coachId`
 * @returns `Promise<ScorebookSession>` returned from the database
 */
export async function postScorebookSession(session: Partial<ScorebookSession>): Promise<ScorebookSession> {
    return await apiPost("/api/sessions", session);
}

///////////////////////////////////////////////////////////////////////////////
// DELETE Helper Functions
///////////////////////////////////////////////////////////////////////////////

export async function apiDelete(url: string, body: any): Promise<any> {
    return await apiCall("DELETE", url, body);
}

export async function deleteScorebookSession(session: Partial<ScorebookSession>): Promise<ScorebookSession> {
    return await apiDelete(`/api/sessions/${session.session_id}`, session);
}