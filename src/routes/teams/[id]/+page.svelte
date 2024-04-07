<script lang="ts">
    import Table from "../../table.svelte";
    import type { PageServerData } from "../$types";

    export let data: PageServerData;

    let teamData = data.locals.teamData;
    let teamTable = data.locals.teamTable;
    let roster = data.locals.roster;
    let blueStyle = "blueTable";
</script>

<main>
    <h1>{teamData.team_name}</h1>
    <h2>Team Satistcs</h2>
    <div class="table-wrapper1">
        <Table tableData={teamTable} style={blueStyle}/>
    </div>
    <h2>Roster</h2>
    <div class="table-wrapper2">
        <Table tableData={roster} style={blueStyle}/>
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
        max-width: 100%;
		overflow-y: auto;
	}

    .table-wrapper2 {
		/*max-height: 300px;*/
        max-width: 100%;
		overflow-y: auto;
	}
</style>