<script lang="ts">
    import Table from "./table.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let recentGames = data.locals.recentGames;
    let gameRouteData = data.locals.gameRouteData;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>Lacrosse E-Scorebook</h1>
    <h2>Recent Games</h2>
    <div class="table-wrapper">
        <Table tableData={recentGames} routeData={gameRouteData} style={blueStyle}/>
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
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    .table-wrapper {
		/*max-height: 30%;*/
		overflow-y: auto;
		max-width: 100%;
	}
</style>

  
