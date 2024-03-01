import { pool, getGame } from '$lib/db';
import { json, error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const home_id = url.searchParams.get("home");
    const away_id = url.searchParams.get("away");
    const team_id = url.searchParams.get("team");
    const field = url.searchParams.get("field");
    const date = url.searchParams.get("date");
    
    try {
        const query = "SELECT * FROM games";
        if (url.searchParams.size == 0) {
            const result = await pool.query(query);
            return json(result.rows);
        }
        let columns: Array<any> = [];
        let columnVals: Array<any> = [];
        let i = 1;
        if (team_id != null) {
            columns.push(`(hometeam_id = $${i} OR awayteam_id = $${i})`);
            columnVals.push(team_id);
            i++;
        }
        if (home_id != null) {
            columns.push(`hometeam_id = $${i}`);
            columnVals.push(home_id);
            i++;
        }
        if (away_id != null) {
            columns.push(`awayteam_id = $${i}`);
            columnVals.push(away_id);
            i++;
        }
        if (field != null) {
            columns.push(`game_field = $${i}`);
            columnVals.push(field);
            i++;
        }
        console.log(query + " WHERE " + columns.join(" AND "));
        const result = await pool.query(query + " WHERE " + columns.join(" AND "), columnVals);
        return json(result.rows);
    }
    catch (err) {
        console.log(err);
        return error(500, { message: "Internal Server Error" });
    }
}

