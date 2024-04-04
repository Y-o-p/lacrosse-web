<script lang="ts">
    import Table from "./table.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let recentGames = data.locals.recentGames;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>Lacrosse E-Scorebook</h1>
    <h2>Recent Games</h2>
    <div class="table-wrapper">
        <Table tableData={recentGames} style={blueStyle}/>
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
		max-height: 30%;
		overflow-y: auto;
		max-width: 100%;
	}
</style>

  
