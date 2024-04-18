<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let playerData = data.locals.playerData;
    let playerTable = data.locals.playerTable;
    let gamesStats = data.locals.gamesStats;
    let playerStats = data.locals.playerStats;
    let gkGamesStats = data.locals.gkGamesStats;
    let gkStats = data.locals.gkStats;

    let plyrsRouteData = data.locals.plyrsRouteData;
    let statsRouteData = data.locals.statsRouteData;

    let blueStyle = "blueTable";
</script>

<main>
    <h1>{playerData.first_name} {playerData.last_name}</h1>
    <h2>Player Information</h2>
    <div class="table-wrapper1">
        <Table tableData={playerTable} routeData={plyrsRouteData} style={blueStyle}/>
    </div>
    <h2>Overall Statistics</h2>
    <div class="table-wrapper1">
        <Table tableData={playerStats} style={blueStyle}/>
    </div>
    {#if gamesStats != null}
        <h2>Statistics By Game</h2>
        <div class="table-wrapper2">
            <Table tableData={gamesStats} routeData={statsRouteData} style={blueStyle}/>
        </div>
    {/if}
    {#if gkStats != null}
    <div>
        <h2>Goalkeeping Statistics</h2>
        <div class="table-wrapper2">
            <Table tableData={gkStats} style={blueStyle}/>
        </div>
    </div>
    {/if}
    {#if gkGamesStats != null}
        <h2>Goalkeeping Statistics By Game</h2>
        <div class="table-wrapper2">
            <Table tableData={gkGamesStats} style={blueStyle}/>
        </div>
    {/if}
</main>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 15px;
        margin-right: 115px;
    }

    h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    .table-wrapper1 {
		/*max-height: 300px;*/
        max-width: 100%;
		overflow-y: auto;
	}

    .table-wrapper2 {
		/*max-height: 300px;*/
        max-width: 100%;
		overflow-y: auto;
	}
</style>