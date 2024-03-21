import { getCoach, getUser, getTeam} from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { authenticateUser } from '$lib/auth';

export async function handle({event, resolve}) {    
    // Authenticate the user here
    let userId = authenticateUser(event);
    if (userId != undefined) {
        let userRow = (await getUser({ user_id: BigInt(userId) }))[0];
        if (userRow != null) {
            if (userRow["role_id"] == 1) { // coach login
                let coachRow = await getCoach((userRow["coach_id"]))
                const user: User = {
                    user_id: BigInt(userRow["user_id"]),
                    user_name: userRow["user_name"],
                    pword: userRow["pword"],
                    role_id: BigInt(userRow["role_id"]),
                    coach_id: BigInt(userRow["coach_id"])
                };
        
                const coach: Coach = {
                    coach_id: BigInt(coachRow["coach_id"]),
                    last_name: coachRow["last_name"],
                    first_name: coachRow["first_name"],
                    birth_date: coachRow["birth_date"],
                    date_created: coachRow["date_created"],
                    phone: coachRow["phone"],
                    team_id: BigInt(coachRow["team_id"])
                };

                let teamRow = await getTeam(Number(coach.team_id));
                const team: Team = {
                    team_id: BigInt(teamRow["team_id"]),
                    team_name: teamRow["team_name"],
                    coach_id: teamRow["coach_id"],
                }
        
                event.locals = {
                    user: user,
                    coach: coach,
                    team: team
                }
            } else if (userRow["role_id"] == 2) { // Temp Scorebook Keeper login
        
            } else if (userRow["role_id"] == 3) { // Webmaster login
        
            }
        }
    }
    else {
        // Unidentified user
        // Block certain users from the sessions endpoint
        const path = event.url.pathname;
        if (path.startsWith("/my-team") ||
            path.startsWith("/scorebooks")) {
            throw redirect(303, "/")
        }
    }

    return await resolve(event)
}