<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let homeTeamData = data.locals.homeTeamData;
    let awayTeamData = data.locals.awayTeamData;
    let gameTable = data.locals.gameTable;
    let awayStatsTable = data.locals.awayStatsTable;
    let homeStatsTable = data.locals.homeStatsTable;
    let awayGkStatsTable = data.locals.awayGkStatsTable;
    let homeGkStatsTable = data.locals.homeGkStatsTable;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>{homeTeamData.team_name} VS. {awayTeamData.team_name}</h1>
    <h2>Information</h2>
    <div class="table-wrapper1">
        <Table tableData={gameTable} style={blueStyle}/>
    </div>
    <h2>{homeTeamData.team_name} - Statistics Per Player</h2>
    <div class="table-wrapper2">
        <Table tableData={homeStatsTable} style={blueStyle}/>
    </div>
    <h2>{awayTeamData.team_name} - Statistics Per Player</h2>
    <div class="table-wrapper2">
        <Table tableData={awayStatsTable} style={blueStyle}/>
    </div>
    <div class="row">
        <div class="column">
            <h2>{homeTeamData.team_name} - Goalkeeping Statistics</h2>
            <div class ="gktable-wrapper">
                <Table tableData={homeGkStatsTable} style={blueStyle}/>
            </div>
        </div>
        <div class="column">
            <h2>{awayTeamData.team_name} - Goalkeeping Statistics</h2>
            <div class ="gktable-wrapper">
                <Table tableData={awayGkStatsTable} style={blueStyle}/>
            </div>
        </div>
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
		/*max-height: 300px;*/
		overflow-y: auto;
		max-width: 100%;
	}

    .table-wrapper2 {
		/*max-height: 300px;*/
		overflow-y: auto;
		max-width: 100%;
	}

    .gktable-wrapper {
        /*max-height: 300px;*/
		overflow-y: auto;
		width: 95%;
    }

    * {
        box-sizing: border-box;
    }

    .row {
        display: flex;
        padding-left: 2.5%;
    }

    /* Create a two-column layout */
    .column {
        float: left;
        width: 50%;
    }

    /* Clearfix (clear floats) */
    .column::after {
        content: "";
        clear: both;
        display: table;
    }
</style>