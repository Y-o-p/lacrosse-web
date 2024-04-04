<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let homeTeamData = data.locals.homeTeamData;
    let awayTeamData = data.locals.awayTeamData;
    let gameTable = data.locals.gameTable;
    let statsTable = data.locals.statsTable
    let blueStyle = "blueTable";
</script>

<main>
    <h1>{homeTeamData.team_name} VS. {awayTeamData.team_name}</h1>
    <h2>Information</h2>
    <div class="table-wrapper1">
        <Table tableData={gameTable} style={blueStyle}/>
    </div>
    <h2>Statistics Per Player</h2>
    <div class="table-wrapper2">
        <Table tableData={statsTable} style={blueStyle}/>
    </div>
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
		overflow-y: auto;
		max-width: 100%;
	}

    .table-wrapper2 {
		max-height: 300px;
		overflow-y: auto;
		max-width: 100%;
	}
</style>