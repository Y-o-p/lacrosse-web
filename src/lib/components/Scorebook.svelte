<script lang="ts">
    import Prelive from "./Prelive.svelte";
    import Live from "./Live.svelte";
    import { onMount } from "svelte";
    import { apiCall } from "$lib/api";
    export let game: Game;
    let homePlayers: Array<Player>;
    let awayPlayers: Array<Player>;
    let homeLineup: Array<Player> = homePlayers;
    let awayLineup: Array<Player> = awayPlayers;

    async function loadRosters() {
        if (game.hometeam_id !== null && game.awayteam_id !== null) {
            homePlayers = await apiCall<Player>("GET", `/api/players?team_id=${game.hometeam_id}`);
            awayPlayers = await apiCall<Player>("GET", `/api/players?team_id=${game.awayteam_id}`);
            let playerStats = await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.hometeam_id}`);
            playerStats = playerStats.concat(await apiCall<PlayerStats>("GET", `/api/player-stats?game_id=${game.game_id}&team_id=${game.awayteam_id}`));

            [...homePlayers, ...awayPlayers].forEach(async (player) => {
                const stats = playerStats.find((stats) => player.player_id == stats.player_id);
                if (stats === undefined) {
                    const newStats = await apiCall<PlayerStats>("POST", "/api/player-stats", {
                        game_id: game.game_id,
                        player_id: player.player_id,
                        team_id: player.team_id,
                        goals: 0,
                        assists: 0,
                        shots: 0,
                        shots_on_goal: 0,
                        ground_balls: 0,
                        turnovers: 0,
                        turnovers_caused: 0,
                        faceoffs_won: 0,
                        faceoffs_lost: 0,
                        saves: 0,
                        penalties: 0,
                        clears_attempted: 0,
                        clears_made: 0,
                        goals_allowed: 0
                    });
                    player.playerstat_id = newStats.playerstat_id;
                }
                else {
                    player.playerstat_id = stats.playerstat_id;
                }
            });
        }
        if (homeLineup === null && awayLineup === null) {
            homeLineup = homePlayers;
            awayLineup = awayPlayers;
        }
    }

    onMount(async () => {
        loadRosters();
    });
</script>

<main>
    {#if game.hometeam_id === null || game.awayteam_id === null}
    <!-- Pre-live -->
        <Prelive
            bind:homeTeam={game.hometeam_id}
            bind:awayTeam={game.awayteam_id}
            bind:homeLineup={homeLineup}    
            bind:awayLineup={awayLineup}
            bind:game={game}
            on:start={() => {loadRosters()}}
        ></Prelive>
    {:else if game.published}
    <!-- Published -->
        <h1>This scorebook is published</h1>
    {:else}
    <!-- Live -->
        <Live 
            on:onMount
            bind:homePlayers={homePlayers}
            bind:awayPlayers={awayPlayers}
            bind:homeLineup={homeLineup}
            bind:awayLineup={awayLineup}
            bind:game={game}
        ></Live>
    {/if}
</main>