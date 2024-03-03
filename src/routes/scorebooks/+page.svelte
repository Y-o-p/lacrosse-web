<script lang="ts">
    import { postScorebookSession } from "$lib/api";

    interface ScorebookPreview {
		game_id: bigint,
		date: Date,
		home: string,
		away: string,
		home_score: number,
		away_score: number,
		field: string,
		session?: ScorebookSession
	}
	
	import { onMount } from "svelte";
    import type { PageServerData } from "../$types";
    import { goto } from "$app/navigation";
    import { getTeam } from "$lib/api";
	export let data: PageServerData;
	let scorebookPreviews: Array<ScorebookPreview> = new Array<ScorebookPreview>();

	onMount(() => {
		refreshScorebooks();
	});

	async function refreshScorebooks() {
		const result = await fetch(`/api/games?team=${data.locals.coach.team_id}`);
		const gameRows = await result.json();
		for (let game of gameRows) {
			const homeTeam = await getTeam(game["hometeam_id"]);
			const awayTeam = await getTeam(game["awayteam_id"]);
			const session = await (await fetch(`/api/sessions?game_id=${game["game_id"]}&coach_id=${data.locals.coach.coach_id}`)).json();
			console.log(session);
			let scorebookPreview: ScorebookPreview = {
				game_id: game["game_id"],
				date: game["game_date"],
				home: homeTeam.team_name,
				away: awayTeam.team_name,
				home_score: 10,
				away_score: 0,
				field: game["game_field"]
            };
			if (session.length > 0) {
				scorebookPreview.session = {
					session_id: BigInt(session[0]["session_id"]),
					game_id: BigInt(session[0]["game_id"]),
					coach_id: BigInt(session[0]["coach_id"]),
					room_code: session[0]["room_code"],
					expire_time: BigInt(session[0]["expire_time"])
				};
			}
			scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		}
		//console.log(scorebookPreviews[0]);
	}

	// async function refreshScorebook(scorebook: ScorebookPreview) {
	// 	let result = await fetch(`/api/games/${scorebook.game_id}`);
	// 	const game = await result.json();
	// 	result = await fetch(`/api/sessions?coach=${data.locals.coach.coach_id}&game=${scorebook.game_id}`);
	// 	const session = await result.json();
	// 	const homeTeam = await getTeam(game["hometeam_id"]);
	// 	const awayTeam = await getTeam(game["awayteam_id"]);
	// 	scorebook.game_id = game["game_id"];
	// 	scorebook.date = game["game_date"];
	// 	scorebook.home = homeTeam.team_name;
	// 	scorebook.away = awayTeam.team_name;
	// 	scorebook.home_score = 10;
	// 	scorebook.away_score = 0;
	// 	scorebook.field = game["game_field"];
	// 	scorebook.session = {
	// 		session_id: session["session_id"],
	// 		game_id: session["game_id"],
	// 		coach_id: session["coach_id"],
	// 		room_code: session["room_code"],
	// 		expire_time: session["expire_time"]
	// 	};
	// }

	async function newSession(scorebook: ScorebookPreview) {
        scorebook.session = await postScorebookSession({ 
			coach_id: data.locals.coach.coach_id,
			game_id: scorebook.game_id
		});
		scorebookPreviews = scorebookPreviews;
		console.log(scorebook.session.room_code);
    }

	async function goToScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
</script>

<div>
	<h1>Scorebooks</h1>
	<ul>
		{#each scorebookPreviews as scorebook (scorebook.game_id)}
			<li>
				Date: {scorebook.date} Home: {scorebook.home} Away: {scorebook.away}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
				{#if scorebook.session == undefined}
					<button on:click={() => newSession(scorebook)}>New Session</button>
				{:else}
					{scorebook.session.room_code}
					<button>Copy Code</button>
					<button>End Session</button>
				{/if}
			</li>
		{/each}
	</ul>
</div>
