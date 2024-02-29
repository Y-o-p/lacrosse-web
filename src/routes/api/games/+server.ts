import { pool, getGame } from '$lib/db.ts';
import { json, error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const home_id = url.searchParams.get("home");
    const away_id = url.searchParams.get("away");
    const team_id = url.searchParams.get("team");
    const field = url.searchParams.get("field");
    const date = url.searchParams.get("date");
    
    try {
        let games: Array<any> = []
        if (url.searchParams.keys().empty()) {
            const result = await pool.query("SELECT * FROM games", [team_id]);
            games.push(...result.rows);
        }
        if (team_id != null) {
            const result = await pool.query("SELECT * FROM games WHERE hometeam_id = $1 OR awayteam_id = $1", [team_id]);
            games.push(...result.rows);
        }
        if (home_id != null) {
            const result = await pool.query("SELECT * FROM games WHERE hometeam_id = $1", [home_id]);
            games.push(...result.rows);
        }
        if (away_id != null) {
            const result = await pool.query("SELECT * FROM games WHERE awayteam_id = $1", [away_id]);
            games.push(...result.rows);
        }
        if (field != null) {
            const result = await pool.query("SELECT * FROM games WHERE field = $1", [field]);
            games.push(...result.rows);
        }
        return json(games);
    }
    catch (error) {
        console.log(error);
        return error(500, { message: "Internal Server Error" });
    }
}

