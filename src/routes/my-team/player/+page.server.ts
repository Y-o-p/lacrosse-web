import { insertRow, pool, insertCoach, insertUser, getUser, getCoach, insertPlayer } from "$lib/db";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */

export const actions = {
    addPlayer: async ({ request }) => {
        console.log("Add Player Ran");
        const data = await request.formData();
    
        // Assuming you have a Player table with columns: first_name, last_name, position, height, weight, birthdate
    
        let player = {
            first_name: data.get('firstName').toString(),
            last_name: data.get('lastName').toString(),
            pos: data.get('position').toString(),
            height: parseFloat(data.get('height').toString()),
            weight: parseFloat(data.get('weight').toString()),
            birth_date: new Date()
        };
    
        // Call a function to insert the player into your database
        let playerId = await insertPlayer(player);
    }

}