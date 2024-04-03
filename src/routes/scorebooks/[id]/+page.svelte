<script lang="ts">
    import type { PageServerData } from "./$types";
    import Scorebook from "./Scorebook.svelte";
    export let data: PageServerData;

</script>

{#if data.props.game.published}
    <h1>This scorebook is published</h1>
{:else}
    <Scorebook 
        bind:homePlayers={data.props.homePlayers}
        bind:awayPlayers={data.props.awayPlayers}
        bind:game={data.props.game}
    ></Scorebook>
{/if}