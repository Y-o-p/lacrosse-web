<script lang="ts">
    import Table from "../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let teamsTable = data.locals.teams;
    let teamsRouteData = data.locals.teamsRouteData;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Teams</h1>
    <div class="table-wrapper">
        <Table tableData={teamsTable} routeData={teamsRouteData} style={blueStyle}/>
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
		overflow-y: auto;
		max-width: 100%;
	}
</style>