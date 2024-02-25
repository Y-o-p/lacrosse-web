import {pool} from "$lib/db";

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({request}) => {
        // TODO log the user in
        console.log("Login Ran");
        const data = await request.formData();
        console.log(data.get('uname'));
        console.log(data.get('pword'));
    },
    register: async ({request}) => {
        // TODO log the user in
        console.log("Register Ran");
        const data = await request.formData();
        /*
        let user: User = {
            user_name: data.get('uname'),
            pword: data.get('pword'),
            role_id: data.get('role'),
            coach_id: 0n
        } */
        console.log(data.get('uname'));
        console.log(data.get('pword'));
        console.log(data.get('role'));
        console.log(data.get('fName'));
        console.log(data.get('lName'));
        console.log(data.get('teamName'));
        console.log(data.get('birthday'));
        console.log(data.get('phone'))


        pool.query('')
    }
};