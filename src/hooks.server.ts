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
                id: BigInt(row["coach_id"]),
                teamId: BigInt(row["team_id"]),
                lastName: row["last_name"],
                firstName: row["first_name"],
                birthdate: new Date(),
                createdDate: new Date()
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