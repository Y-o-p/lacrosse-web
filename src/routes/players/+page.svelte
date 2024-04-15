<script lang="ts">
    import Table from "../table.svelte"
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let playersTable = data.locals.players;
    let plyrsRouteData = data.locals.plyrsRouteData;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Players</h1>
    <div class="table-wrapper">
        <Table tableData={playersTable} routeData={plyrsRouteData} style={blueStyle}/>
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
		max-height: 590px;
        max-width: 100%;
		overflow-y: auto;
	}
</style>