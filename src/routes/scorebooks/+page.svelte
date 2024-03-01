<script lang="ts">
    import { onMount } from "svelte";
    import type { PageServerData } from "../$types";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
	export let data: PageServerData;
	export let scorebooks: Array<Game> = new Array<Game>();

	onMount(() => {
		refreshScorebooks();
	});

	async function refreshScorebooks() {
		const result = await fetch(`/api/games?team=${data.locals.coach.team_id}`);
		const gameRows = await result.json();
		for (let game of gameRows) {
			console.log(game);
			scorebooks = [...scorebooks, {
                hometeam_id: BigInt(game["hometeam_id"]),
                awayteam_id: BigInt(game["awayteam_id"]),
                game_date: new Date(game["game_date"]),
				game_field: game["game_field"],
            }];
		}
		console.log(scorebooks[0]);
	}

	async function goToScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
</script>

<div>
	<h1>Scorebooks</h1>
	<ul>
		{#each scorebooks as scorebook}
			<li>
				Date: {scorebook.game_date} Home: {scorebook.hometeam_id} Away: {scorebook.awayteam_id}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
			</li>
		{/each}
	</ul>
</div>
{scorebooks.length}