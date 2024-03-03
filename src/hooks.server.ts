import { getCoach, getUser} from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/auth';

export async function handle({event, resolve}) {    
    // Authenticate the user here
    let userId = authenticateUser(event);
    if (userId != undefined) {
            let userRow = await getUser({ user_id: BigInt(userId) });
            if (userRow != null) {
                if (userRow["role_id"] == '1') { // coach login
                    let coachRow = await getCoach((userRow["coach_id"]))
                    console.log(coachRow)
            
                    const coach: Coach = {
                        coach_id: BigInt(coachRow["coach_id"]),
                        last_name: coachRow["last_name"],
                        first_name: coachRow["first_name"],
                        birth_date: coachRow["last_name"],
                        date_created: coachRow["last_name"],
                        phone: coachRow["phone"]
                    };
            
                    event.locals = {
                        user: "coach",
                        id: 1,
                        coach: coach
                    }
                } else if (userRow["role_id"] == '2') { // Temp Scorebook Keeper login
            
                } else if (userRow["role_id"] == '3') { // Webmaster login
            
                }
        }
    }
    else {
        // Unidentified user
    }
    

    const path = event.url.pathname;
    // Block certain users from the sessions endpoint
    if (event.locals.user !== "webmaster") {
        if (event.locals.user !== "coach") {
            if (path.startsWith("/my-team") ||
                path.startsWith("/scorebooks") ||
                path.startsWith("/api/sessions")) {
                throw redirect(303, "/")
            }
        }
    }

    return await resolve(event)
}