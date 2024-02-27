import { getPlayer } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const id = params.id;
    try {
        const player = await getPlayer(Number(id));
        return json(player);
    } catch (error) {
        console.error(error);
        return json({
            status: 500,
            body: { error: 'Internal server error' },
        });
    }
}
