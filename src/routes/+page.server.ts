import { redirect } from "@sveltejs/kit";
import { insertCoach, insertUser, getUser, getTeam, getGameByInterval, getGameStats} from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

    let recentGameRows = await getGameByInterval(30);
    let numGames = Object.keys(recentGameRows).length;
    let recentGames = [];

    for (let i = 0; i < numGames; i++){
        let homeTeamRow = await getTeam(recentGameRows[i]["hometeam_id"]);
        let awayTeamRow = await getTeam(recentGameRows[i]["awayteam_id"]);

        let homeScore = 0;
        let homeStatsRow = await getGameStats(recentGameRows[i]["game_id"], recentGameRows[i]["hometeam_id"]);
        for (let j = 0; j < Object.keys(homeStatsRow).length; j++){
            homeScore += homeStatsRow[j]["goals"];
        }

        let awayScore = 0;
        let awayStatsRow = await getGameStats(recentGameRows[i]["game_id"], recentGameRows[i]["awayteam_id"]);
        for (let j = 0; j < Object.keys(awayStatsRow).length; j++){
            awayScore += awayStatsRow[j]["goals"];
        }

        let game: GameTable = {
            "Game Date": recentGameRows[i]["game_date"].toLocaleDateString(),
            "Game Field": recentGameRows[i]["game_field"].toString(),
            "Home Team": homeTeamRow["team_name"].toString(),
            "Away Team": awayTeamRow["team_name"].toString(),
            "Home Score": homeScore,
            "Away Score": awayScore
        }
        recentGames.push(game);
    }

    locals.recentGames = recentGames;
	return { locals: locals};
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({cookies, request, locals}) => {
        // TODO log the user in
        console.log("Login Ran")
        const data = await request.formData()

        let vals: Partial<User> = {
            user_name: data.get('uname').toString(),
            pword: data.get('pword').toString()
        }
        let userRow = (await getUser(vals))[0]
        console.log(userRow)
        
        if (userRow == null){
            console.log("LOGIN UNSUCCESSFUL")
        }else {
            console.log("LOGIN SUCCESSFUL")
            cookies.set("auth", userRow["user_id"], {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                maxAge: 60 * 60 * 24 * 7, // 1 week
            })
            
            throw redirect(303, "/")
        }

    },
    register: async ({request}) => { 
        // Signs up the user with entered in credentials
        console.log("Register Ran")
        const data = await request.formData()

        let coach: Coach = {
            last_name: data.get('lName').toString(),
            first_name: data.get('fName').toString(),
            birth_date: new Date(data.get('birthday').toString()),
            phone: data.get('phone').toString(),
            date_created: new Date()
        }
        let row = await insertCoach(coach)

        let user: User = {
            user_name: data.get('uname').toString(),
            pword: data.get('pword').toString(),
            role_id: 1n,
            coach_id: BigInt(row["coach_id"])
        }
        let userID = await insertUser(user);
        
    }
};