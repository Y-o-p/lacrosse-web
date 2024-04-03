import { responseFromFunction } from '$lib/api_util.js';
import { deleteGame, editGame, getGame } from '$lib/db.js';
import { json } from '@sveltejs/kit';
import { editRow } from '$lib/db'; 

export async function GET({ params }) {
    return responseFromFunction(async () => {
        return getGame(Number(params.id));
    });
}

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ params, request }) {
    return responseFromFunction(async () => {
        let j = await request.json();
        return editGame(j as Game, {game_id: BigInt(params.id)});
    });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    return responseFromFunction(async () => {
        return deleteGame(Number(params.id));
    });
}


export async function PUT({ params, request }) {
    const { id } = params; 
    const gameData = await request.json(); 

    try {
    
        const result = await editRow('games', gameData, { game_id: Number(id) });
        if (result) {
            return json({ success: true, message: "Game updated successfully." });
        } else {
            return json({ success: false, error: 'Game not found or update failed' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating game:', error);
        return json({ success: false, error: 'Failed to update game information' }, { status: 500 });
    }
}
