<script lang="ts">
    import { onMount } from "svelte";
    import type { PageServerData } from "../$types";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
	export let data: PageServerData;

	onMount(() => {
		console.log(data.games);
	});

	async function goToScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
</script>

<div>
	<h1>Scorebooks</h1>
	<ul>
		{#each data.games as scorebook}
			<li>
				Date: {scorebook.game_date} Home: {scorebook.hometeam_id} Away: {scorebook.awayteam_id}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
			</li>
		{/each}
	</ul>
</div>