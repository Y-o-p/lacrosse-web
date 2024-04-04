<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let playerData = data.locals.playerData;
    let playerTable = data.locals.playerTable;
    let gamesStats = data.locals.gamesStats;
    let playerStats = data.locals.playerStats;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>{playerData.first_name} {playerData.last_name}</h1>
    <h2>Player Information</h2>
    <div class="table-wrapper1">
        <Table tableData={playerTable} style={blueStyle}/>
    </div>
    <h2>Player Statistics</h2>
    <div class="table-wrapper1">
        <Table tableData={playerStats} style={blueStyle}/>
    </div>
    {#if gamesStats != null}
        <h2>Player Statistics By Game</h2>
        <div class="table-wrapper2">
            <Table tableData={gamesStats} style={blueStyle}/>
        </div>
    {/if}
</main>

<style>
    main {
        margin-top: 130px;
        margin-bottom: 100px;
        margin-left: 10px;
        margin-right: 110px;
    }

    .table-wrapper1 {
		max-height: 300px;
        max-width: 100%;
		overflow-y: auto;
	}

    .table-wrapper2 {
		max-height: 300px;
        max-width: 100%;
		overflow-y: auto;
	}
</style>