<script lang="ts">
    import Scorebook from "$lib/components/Scorebook.svelte";
    import type { PageServerData } from "../$types";
    export let data: PageServerData;
</script>

<Scorebook
    bind:game={data.props.game}
    bind:requiredTeam={data.props.requiredTeam}
></Scorebook>