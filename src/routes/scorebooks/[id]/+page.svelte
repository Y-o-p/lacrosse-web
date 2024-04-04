<script lang="ts">
    import type { PageServerData } from "./$types";
    import Prelive from "./Prelive.svelte";
    import Scorebook from "./Scorebook.svelte";
    export let data: PageServerData;
    let homeLineup: Array<Player> = data.props.homePlayers;
    let awayLineup: Array<Player> = data.props.awayPlayers;

</script>

<main>
    {#if data.props.game.hometeam_id === null || data.props.game.awayteam_id === null}
    <!-- Pre-live -->
        <Prelive
            bind:homeLineup={homeLineup}    
            bind:awayLineup={awayLineup}
            bind:homeTeam={data.props.game.hometeam_id}
            bind:awayTeam={data.props.game.awayteam_id}
            bind:game={data.props.game}
        ></Prelive>
    {:else if data.props.game.published}
    <!-- Published -->
        <h1>This scorebook is published</h1>
    {:else}
    <!-- Live -->
        <Scorebook 
            bind:homePlayers={data.props.homePlayers}
            bind:awayPlayers={data.props.awayPlayers}
            bind:homeLineup={homeLineup}    
            bind:awayLineup={awayLineup}
            bind:game={data.props.game}
        ></Scorebook>
    {/if}
</main>