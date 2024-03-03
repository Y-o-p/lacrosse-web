<script lang="ts">
    import { deleteScorebookSession, postScorebookSession } from "$lib/api";

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
    import Modal from "./modal.svelte";
    import Confirm from "./confirm.svelte";
	export let data: PageServerData;
	let showDeletionModal = false;
	let showNewScorebookModal = false;
	let showEndSessionModal = false;
	let scorebookPreviews: Array<ScorebookPreview> = new Array<ScorebookPreview>();
	let selectedScorebook: ScorebookPreview;

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
	}

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
	
	async function copyRoomCode(code: string) {
		await navigator.clipboard.writeText(code);
	}

	async function deletionButton(scorebook: ScorebookPreview) {
		selectedScorebook = scorebook;
		showDeletionModal = true;
	}

	async function endSessionButton(scorebook: ScorebookPreview) {
		selectedScorebook = scorebook;
		showEndSessionModal = true;
	}

	async function deleteScorebook(scorebook: ScorebookPreview) {
		
	}

	async function endSession(scorebook: ScorebookPreview) {
		const result = await deleteScorebookSession(scorebook.session);
		delete scorebook.session;
		scorebookPreviews = scorebookPreviews;
	}

</script>



<h1>Scorebooks</h1>
<button on:click={() => {showNewScorebookModal = !showNewScorebookModal;}}>New Scorebook</button>
<div>
	<ul>
		{#each scorebookPreviews as scorebook (scorebook.game_id)}
			<li>
				Date: {scorebook.date} Home: {scorebook.home} Away: {scorebook.away}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
				{#if scorebook.session == undefined}
					<button on:click={() => newSession(scorebook)}>New Session</button>
				{:else}
					{scorebook.session.room_code}
					<button on:click={() => copyRoomCode(scorebook.session.room_code)}>Copy Code</button>
					<button on:click={ () => endSessionButton(scorebook) }>End Session</button>
				{/if}
				<button on:click={ () => deletionButton(scorebook) }>Delete</button>
			</li>
		{/each}
	</ul>
</div>

<Modal bind:show={showNewScorebookModal}>
	<h2 slot="header">New Scorebook</h2>
	<button>New Session</button>
	<br>
	<button>Edit</button>
</Modal>

<Confirm bind:show={showEndSessionModal} on:confirm={ () => { endSession(selectedScorebook) } }>
	<p>Are you sure you want to end the session? It will kick out anyone working on the scorebook.</p>
</Confirm>

<Confirm bind:show={showDeletionModal} on:confirm={ () => { deleteScorebook(selectedScorebook) } }>
	<p>Are you sure you want to delete this scorebook? This action is irreversible.</p>
</Confirm>