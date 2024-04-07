<script lang="ts">
    import Table from "../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let gamesTable = data.locals.games;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Games</h1>
    <div class="table-wrapper">
        <Table tableData={gamesTable} style={blueStyle}/>
    </div>
</main>

<style>
    main {
        margin-top: 130px;
        margin-left: 10px;
        margin-right: 110px;
        height: 100%;
    }

    .table-wrapper {
		/*max-height: 100%;*/
		overflow-y: auto;
		max-width: 100%;
	}
</style>