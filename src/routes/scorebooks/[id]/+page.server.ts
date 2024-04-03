import { goto } from '$app/navigation';
import { getGame, getRowsFromVals, insertPlayerStats } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    if (locals.coach.team_id !== undefined) {
        const team_id = BigInt(locals.coach.team_id);
        const game_id = BigInt(params.id);
        try {
            let game = (await getGame(Number(game_id))) as Game;
            if (game.hometeam_id != team_id && game.awayteam_id != team_id) {
                throw redirect(303, "/scorebooks");
            }

            const homePlayers = await getRowsFromVals("players", { team_id: BigInt(game.hometeam_id) });
            const awayPlayers = await getRowsFromVals("players", { team_id: BigInt(game.awayteam_id) });

            let playerStats = await getRowsFromVals("player_stats", { game_id: game_id, team_id: game.hometeam_id });
            playerStats = playerStats.concat(await getRowsFromVals("player_stats", { game_id: game_id, team_id: game.awayteam_id }));

            [...homePlayers, ...awayPlayers].forEach(async (player) => {
                const stats = playerStats.find((stats) => player.player_id == stats.player_id);
                if (stats === undefined) {
                    const newStats = await insertPlayerStats({
                        game_id: game_id,
                        player_id: player.player_id,
                        team_id: player.team_id
                    });
                    player.playerstat_id = newStats.playerstat_id;
                }
                else {
                    player.playerstat_id = stats.playerstat_id;
                }
            });
            
            return {
                props: {
                    locals,
                    homePlayers: homePlayers,
                    awayPlayers: awayPlayers,
                    game: game
                }
            }
        }
        catch {
            throw redirect(303, "/scorebooks");
        }
    }
    
    throw redirect(303, "/");
}