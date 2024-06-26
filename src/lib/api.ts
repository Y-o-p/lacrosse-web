// These are API helper functions. They are provided to avoid fetch calls.
// You can use these in server and client side content. 

import { toJson } from "./util";

export async function apiCall<Type>(method: string, url: string, body?: Partial<Type>): Promise<Array<Type>> {
    try {
        const result = await fetch(url, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: body !== undefined ? toJson(body) : undefined
        });
        const rows: Array<Type> = (await result.json()) as Array<Type>;
        return rows;
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
                date_created: new Date,
                email: row["email"],
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
export async function getPlayersByTeamId(teamId: bigint): Promise<Player[]> {
    const players = await apiCall<Player>("GET", `/api/players?team_id=${teamId}`);
    return players;
}

export async function getPlayerStats(id): Promise<PlayerStats> {
    const result = await (await fetch(`/api/player-stats/${id}`)).json();
    const player_stats: PlayerStats = result as PlayerStats;
    return player_stats;
}

export async function getGame(id): Promise<Game> {
    const result = await (await fetch(`/api/games/${id}`)).json();
    const player_stats: Game = result as Game;
    return player_stats;
}

export async function getTeamStatsFromGame(team_id, game_id) {
    const stats = await apiCall<PlayerStats>("GET", `/api/player-stats?team_id=${team_id}&game_id=${game_id}`);
    return stats;
}

export async function getGameForHalftime(id, fetch): Promise<Game> {
    const result = await fetch(`/api/games/${id}`);
    const game: Game = await result.json() as Game;
    return game;
}


///////////////////////////////////////////////////////////////////////////////
// PATCH Helper Functions
///////////////////////////////////////////////////////////////////////////////

export async function patchGame(stats: Partial<Game>) {
    return apiCall<Game>("PATCH", `/api/games/${stats.game_id}`, stats);
}

export async function patchPlayerStats(stats: Partial<PlayerStats>) {
    return apiCall<PlayerStats>("PATCH", `/api/player-stats/${stats.playerstat_id}`, stats);
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