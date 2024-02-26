import { getCoach } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function handle({event, resolve}) {    
    // Authenticate the user here
    event.locals = {
        user: "coach",
        id: 1,
        coach: await (async () => {
            const row = await getCoach(1);
            const coach: Coach = {
                coach_id: BigInt(row["coach_id"]),
                team_id: BigInt(row["team_id"]),
                last_name: row["last_name"],
                first_name: row["first_name"],
                birth_date: new Date(),
                date_created: new Date()
            };
            return coach;
        })()
    }

    // Block certain users from the sessions endpoint
    if (event.url.pathname.startsWith("/api/sessions")) {
        if (event.locals.user !== "coach" && event.locals.user !== "webmaster") {
            throw redirect(303, "/")
        }
    }

    return await resolve(event);
}