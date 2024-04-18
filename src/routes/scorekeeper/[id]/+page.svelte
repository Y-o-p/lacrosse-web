<script lang="ts">
    import Scorebook from "$lib/components/Scorebook.svelte";
    import type { PageServerData } from "../$types";
    export let data: PageServerData;
</script>

<main>
    <Scorebook
        bind:game={data.props.game}
        bind:requiredTeam={data.props.requiredTeam}
    ></Scorebook>
</main>

<style>
</style>