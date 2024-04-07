import { redirect } from "@sveltejs/kit";
import { editUser, editCoach } from "$lib/db";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

    // If user is a viewer, redirect to home page
    if ( locals.user == null ) {
        console.log("LOCALS.USER = NULL");
        throw redirect(303, "/");
    }

	return locals;
}

/** @type {import('./$types').Actions} */
export const actions = {
    edit: async ({request, locals}) => {
        console.log("Edit Ran")
        const data = await request.formData()

        let newUser = data.get('uname').toString()
        let newPword = data.get('pword').toString()
        let newEmail = data.get('email').toString()
        let newPhone = data.get('phone').toString()

        let userVals: Partial<User> = {}
        let coachVals: Partial<Coach> = {}
        if (newUser != null) {
            userVals.user_name = newUser
        }
        if (newPword != null) {
            userVals.pword = newPword
        }

        if (userVals.user_name || userVals.pword ){
            let userIDs: Partial<User> = {
                coach_id: BigInt(locals.user.coach_id)
            }
            let ret = await editUser(userVals, userIDs);
        }

        if (newEmail != "") {
            coachVals.email = newEmail;
        }

        if (newPhone != "" && newPhone != "###-###-####") {
            coachVals.phone = newPhone
        }

        if (coachVals.email || coachVals.phone) {
            let coachIDs: Partial<User> = {
                coach_id: BigInt(locals.user.coach_id)
            }
            let ret = await editCoach(coachVals, coachIDs);
        }
        throw redirect(303, "/account")
    },
    logout: async ({cookies, request, locals}) => {
        console.log("Logout Ran")
        cookies.delete('auth', {path: '/'})
        throw redirect(303, "/")
    }
}