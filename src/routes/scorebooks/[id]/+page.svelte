<script lang="ts">
    import type { PageServerData } from "./$types";
    import Scorebook from "./Scorebook.svelte";
    export let data: PageServerData;

</script>

<Scorebook 
    bind:homePlayers={data.props.homePlayers}
    bind:awayPlayers={data.props.awayPlayers}
    bind:game={data.props.game}
></Scorebook>