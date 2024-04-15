<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    // Local Data
    let homeTeamData = data.locals.homeTeamData;
    let awayTeamData = data.locals.awayTeamData;

    // Local Tables
    let gameTable = data.locals.gameTable;
    let awayStatsTable = data.locals.awayStatsTable;
    let homeStatsTable = data.locals.homeStatsTable;
    let awayGkStatsTable = data.locals.awayGkStatsTable;
    let homeGkStatsTable = data.locals.homeGkStatsTable;

    // Local Route Maps
    let gameRouteData = data.locals.gameRouteData;
    let homePlyrsRouteData = data.locals.homePlyrsRouteData;
    let awayPlyrsRouteData = data.locals.awayPlyrsRouteData;
    let homeGKRouteData = data.locals.homeGKRouteData;
    let awayGKRouteData = data.locals.awayGKRouteData;

    let blueStyle = "blueTable";
</script>

<main>
    <h1>
        <span class="team">{awayTeamData.team_name}</span>
        <span class="subtext">vs.</span>
        <span class="team">{homeTeamData.team_name}</span>
    </h1>
    <h2>Game Information</h2>
    <div class="table-wrapper1">
        <Table tableData={gameTable} routeData={gameRouteData} style={blueStyle}/>
    </div>
    <h2>{homeTeamData.team_name} - Statistics Per Player</h2>
    <div class="table-wrapper2">
        <Table tableData={homeStatsTable} routeData={homePlyrsRouteData} style={blueStyle}/>
    </div>
    <h2>{awayTeamData.team_name} - Statistics Per Player</h2>
    <div class="table-wrapper2">
        <Table tableData={awayStatsTable} routeData={awayPlyrsRouteData} style={blueStyle}/>
    </div>
    <div class="row">
        <div class="column">
            <h2>{homeTeamData.team_name} - Goalkeeping Statistics</h2>
            <div class ="gktable-wrapper">
                <Table tableData={homeGkStatsTable} routeData={homeGKRouteData} style={blueStyle}/>
            </div>
        </div>
        <div class="column">
            <h2>{awayTeamData.team_name} - Goalkeeping Statistics</h2>
            <div class ="gktable-wrapper">
                <Table tableData={awayGkStatsTable} routeData={awayGKRouteData} style={blueStyle}/>
            </div>
        </div>
    </div>

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
        background-color: navy;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    .team {
        text-transform: uppercase;
        font-style: italic;
        font-weight: 500;
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-kerning: normal;
    }

    .subtext {
        padding-left: 10px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-weight: 100;
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