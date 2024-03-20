<script lang="ts">
    import Table from "./table.svelte";
    import type { PageServerData } from "./$types";
    import { onMount } from "svelte";

    export let data: PageServerData;
    let games;

    let recentGames = data.locals.recentGames;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>Locrosse E-Scorebook</h1>

    <h2>Recent Games</h2>
    <Table tableData={recentGames} style={blueStyle}/>
</main>

  
