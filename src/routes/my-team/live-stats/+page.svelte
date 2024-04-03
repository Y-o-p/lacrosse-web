<script lang="ts">
    import type { PageServerData } from "./$types";
    import Scorebook from "./Scorebook.svelte";
    export let data: PageServerData;

</script>

<Scorebook 
    bind:home_players_roster={data.props.homePlayers}
    bind:away_players_roster={data.props.awayPlayers} 
></Scorebook>