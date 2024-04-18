import type { PageServerLoad } from './$types';
import { getPlayersByTeamId } from '$lib/db';

export const load: PageServerLoad = async ({ locals }) => {
  // Retrieve team ID from locals
  const teamId = locals.coach.team_id;

  try {
    const players = await getPlayersByTeamId(teamId);
    return { players };
  } catch (error) {
    console.error('Error fetching players by team ID:', error);
    return {
      status: 500,
      error: 'Internal Server Error'
    };
  }
};