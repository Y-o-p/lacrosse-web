import { getTeam, insertRow, pool, insertCoach, insertUser, getUser, getCoach, insertPlayer, updateCoachTeamId, setCoachTeamId, insertTeam } from "$lib/db";

import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {

    const team = await getTeam(Number(locals.coach.team_id));
    
    return {locals, team};
}

export const actions = {
    addPlayer: async ({ request }) => {
        const data = await request.formData();
    
        let player = {
            first_name: data.get('firstName').toString(),
            last_name: data.get('lastName').toString(),
            pos: data.get('position').toString(),
            height: parseFloat(data.get('height').toString()),
            weight: parseFloat(data.get('weight').toString()),
            team_id: BigInt(data.get('team_id').toString()),
            clg_class: data.get('clg_class').toString(),
            jersey_num: Number(data.get('jerseyNumber').toString()),
            major: data.get('major').toString(),
            home_town: data.get('home_town').toString(),
        };

        let coach = {
            team_id: BigInt(data.get('team_id').toString())
        };

        let playerId = await insertPlayer(player);

        throw redirect(303, "/my-team/roster");
    },

    createTeam: async ({ request }) => {
        // Wait for form data
        const data = await request.formData();
        
        // Set vals based on form data
        const teamName = data.get('teamName').toString();
        const coachID = BigInt(data.get('coach_id').toString());

        // Update the coach team_id
        if (BigInt(data.get('team_id').toString()) == (BigInt(0))) {
            updateCoachTeamId(coachID);
        }
        
        const teamID = BigInt(data.get('team_id').toString());
        // Update Coach's row team_id

        let team = {
            team_name: teamName,
            coach_id: coachID,
            team_id: teamID,
        }
        // Insert the team row into the teams table
        await insertTeam(team);

        
    }
};
