import { redirect } from "@sveltejs/kit";
import { insertRow, pool, insertCoach, insertUser, getUser, getCoach } from "$lib/db";

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
        let userRow = await getUser(vals)
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