import { getCoach, getUser} from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/auth';

export async function handle({event, resolve}) {    
    // Authenticate the user here
    let userId = authenticateUser(event);

    let vals: Partial<User> = {
        user_id: BigInt(userId),
    }
    let userRow = await getUser(vals)

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

    } else { //undefined role in user

    }

    // Block certain users from the sessions endpoint
    if (event.url.pathname.startsWith("/api/sessions")) {
        if (event.locals.user !== "coach" && event.locals.user !== "webmaster") {
            throw redirect(303, "/")
        }
    }

    return await resolve(event)
}