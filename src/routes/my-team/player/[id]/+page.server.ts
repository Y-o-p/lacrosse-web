import { getPlayer, editPlayer, deletePlayer } from '$lib/db';
import type { PageServerLoad, Actions } from './$types';
import { json, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const playerId = Number(params.id);

  try {
    const player = await getPlayer(playerId);

    if (!player) {
      throw redirect(302, '/my-team/roster');
    }

    return {
      player,
    };
  } catch (error) {
    console.error('Error fetching player:', error);
    throw redirect(302, '/my-team/roster');
  }
};

export const actions: Actions = {
  update: async ({ params, request }) => {
    const playerId = Number(params.id);
    const formData = await request.formData();
    const playerData = Object.fromEntries(formData);

    try {
      const updatedPlayer = await editPlayer(playerData, { player_id: playerId });
      if (updatedPlayer) {
        return { success: true };
      } else {
        return { error: 'Player update failed or player not found' };
      }
    } catch (error) {
      console.error('Error updating player:', error);
      return { error: 'Failed to update player information' };
    }
  },

  delete: async ({ params }) => {
    const playerId = Number(params.id);

    try {
      await deletePlayer(playerId);
      throw redirect(302, '/my-team/roster');
    } catch (error) {
      console.error('Error deleting player:', error);
      return { error: 'Failed to delete player' };
    }
  },
};