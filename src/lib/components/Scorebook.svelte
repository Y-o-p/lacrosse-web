<script lang="ts">
    import Prelive from "./Prelive.svelte";
    import Live from "./Live.svelte";
    export let homePlayers: Array<Player>;
    export let awayPlayers: Array<Player>;
    let homeLineup: Array<Player> = homePlayers;
    let awayLineup: Array<Player> = awayPlayers;
    export let game: Game;
</script>

<main>
    {#if game.hometeam_id === null || game.awayteam_id === null}
    <!-- Pre-live -->
        <Prelive
            bind:homeLineup={homeLineup}    
            bind:awayLineup={awayLineup}
            bind:homeTeam={game.hometeam_id}
            bind:awayTeam={game.awayteam_id}
            bind:game={game}
        ></Prelive>
    {:else if game.published}
    <!-- Published -->
        <h1>This scorebook is published</h1>
    {:else}
    <!-- Live -->
        <Live 
            bind:homePlayers={homePlayers}
            bind:awayPlayers={awayPlayers}
            bind:homeLineup={homeLineup}
            bind:awayLineup={awayLineup}
            bind:game={game}
        ></Live>
    {/if}
</main>