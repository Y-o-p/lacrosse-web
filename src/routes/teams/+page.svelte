<script lang="ts">
    import Table from "../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let teamsTable = data.locals.teams;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Teams</h1>
    <div class="table-wrapper">
        <Table tableData={teamsTable} style={blueStyle}/>
    </div>
</main>

<style>
    main {
        margin-top: 130px;
        margin-bottom: 80px;
        margin-left: 10px;
        margin-right: 110px;
        height: 100%;
    }

    .table-wrapper {
		max-height: 50%;
		overflow-y: auto;
		max-width: 100%;
	}
</style>