<script lang="ts">
    import Table from "../table.svelte"
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let playersTable = data.locals.players;
    let blueStyle = "blueTable";

</script>

<main>
    <h1>Players</h1>
    <div class="table-wrapper">
        <Table tableData={playersTable} style={blueStyle}/>
    </div>
</main>

<style>
    main {
        margin-top: 130px;
        margin-bottom: 100px;
        margin-left: 10px;
        margin-right: 110px;
    }

    .table-wrapper {
		max-height: 630px;
        max-width: 100%;
		overflow-y: auto;
	}
</style>