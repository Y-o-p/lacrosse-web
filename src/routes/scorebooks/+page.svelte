<script lang="ts">
    interface ScorebookPreview {
		game_id: bigint,
		date: Date,
		home: string,
		away: string,
		home_score: number,
		away_score: number,
		field: string
	}
	
	import { onMount } from "svelte";
    import type { PageServerData } from "../$types";
    import { goto } from "$app/navigation";
    import { getTeam } from "$lib/api";
	export let data: PageServerData;
	export let scorebookPreviews: Array<ScorebookPreview> = new Array<ScorebookPreview>();

	onMount(() => {
		refreshScorebooks();
	});

	async function refreshScorebooks() {
		const result = await fetch(`/api/games?team=${data.locals.coach.team_id}`);
		const gameRows = await result.json();
		for (let game of gameRows) {
			console.log(game);
			const homeTeam = await getTeam(game["hometeam_id"]);
			const awayTeam = await getTeam(game["awayteam_id"]);
			console.log(homeTeam);
			scorebookPreviews = [...scorebookPreviews, {
				game_id: game["game_id"],
				date: game["game_date"],
				home: homeTeam.team_name,
				away: awayTeam.team_name,
				home_score: 10,
				away_score: 0,
				field: game["game_field"]
            }];
		}
		console.log(scorebookPreviews[0]);
	}

	async function goToScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
</script>

<div>
	<h1>Scorebooks</h1>
	<ul>
		{#each scorebookPreviews as scorebook}
			<li>
				Date: {scorebook.date} Home: {scorebook.home} Away: {scorebook.away}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
			</li>
		{/each}
	</ul>
</div>
