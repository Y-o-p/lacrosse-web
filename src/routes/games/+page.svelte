<script lang="ts">
    import Table from "../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let gamesTable = data.locals.games;
    let gamesRouteData = data.locals.gamesRouteData;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Games</h1>
    <div class="table-wrapper">
        <Table tableData={gamesTable} routeData={gamesRouteData} style={blueStyle}/>
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

    .table-wrapper {
		/*max-height: 100%;*/
		overflow-y: auto;
		max-width: 100%;
	}
</style>