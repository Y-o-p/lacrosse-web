import { responseFromFunction } from '$lib/api_util.js';
import { deletePlayer, getPlayer,getPlayersByTeamId } from '$lib/db.js';
import { json } from '@sveltejs/kit';
import { editRow } from '$lib/db'; 

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const teamId = url.searchParams.get('team_id');

    if (teamId) {
        return responseFromFunction(async () => {
            return getPlayersByTeamId(BigInt(teamId));
        });
    } else {
        return responseFromFunction(async () => {
            return getPlayer(Number(url.searchParams.get('id')));
        });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deletePlayer(Number(params.id));
    })
}



/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request }) {
    const { id } = params; // extracting the player ID from URL parameters
    const playerData = await request.json(); 

    try {
        // uses editrow to update info 
        const result = await editRow('players', playerData, { player_id: Number(id) });
        
        if (result && result.length > 0) {
            
            return json({ success: true, player: result[0] });
        } else {
            
            return json({ success: false, error: 'Player update failed or player not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating player:', error);
        
        return json({ success: false, error: 'Failed to update player information' }, { status: 500 });
    }
}

