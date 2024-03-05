<script lang="ts">
	import { deleteScorebookSession, postScorebookSession } from "$lib/api";	
	import { onMount } from "svelte";
	import type { PageServerData } from "../$types";
	import { goto } from "$app/navigation";
	import { getTeam } from "$lib/api";
	import Modal from "./modal.svelte";
	import Confirm from "./confirm.svelte";
	
    interface ScorebookPreview {
		date?: Date,
		game_id?: bigint,
		home?: string,
		away?: string,
		home_score?: number,
		away_score?: number,
		field?: string,
		session?: ScorebookSession
	}
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
		const homeTeamResult = await fetch(`/api/games?hometeam_id=${data.locals.coach.team_id}`);
		const gameRows = await homeTeamResult.json();
		const awayTeamResult = await fetch(`/api/games?awayteam_id=${data.locals.coach.team_id}`);
		gameRows.push(...(await awayTeamResult.json()));
		for (let game of gameRows) {
			const homeTeam = await getTeam(game["hometeam_id"]);
			const awayTeam = await getTeam(game["awayteam_id"]);
			const session = await (await fetch(`/api/sessions?game_id=${game["game_id"]}&coach_id=${data.locals.coach.coach_id}`)).json();
			let scorebookPreview: ScorebookPreview = {
				game_id: game["game_id"],
				date: new Date(game["game_date"]),
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
		const sessions = await (await fetch(`/api/sessions?game_id=null`)).json();
		for (let session of sessions) {
			session = {
				session_id: BigInt(session["session_id"]),
				coach_id: BigInt(session["coach_id"]),
				room_code: session["room_code"],
				expire_time: BigInt(session["expire_time"])
			};
			let scorebookPreview: ScorebookPreview = {
				session: session
			};
			scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		}

		sortScorebooks();
	}

	function sortScorebooks() {
		scorebookPreviews.sort((a, b) => {
			return b.date - a.date;
		});
		console.log(scorebookPreviews);
	}

	async function newSession(scorebook: ScorebookPreview) {
        scorebook.session = await postScorebookSession({ 
			coach_id: data.locals.coach.coach_id,
			game_id: scorebook.game_id
		});
		scorebookPreviews = scorebookPreviews;
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
		if (scorebook.game_id !== undefined) {
			const gameResult = await fetch(`api/games/${scorebook.game_id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			});
			const playerStatsResult = await fetch(`api/player-stats?game_id=${scorebook.game_id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			});
		}
		if (scorebook.session !== undefined) {
			endSession(scorebook);
		}
		const i = scorebookPreviews.indexOf(scorebook);
		scorebookPreviews.splice(i, 1);
		scorebookPreviews = scorebookPreviews;
	}

	async function endSession(scorebook: ScorebookPreview) {
		const result = await deleteScorebookSession(scorebook.session);
		delete scorebook.session;
		scorebookPreviews = scorebookPreviews;
	}

	async function newScorebookEdit() {
		showNewScorebookModal = false;
		// TODO: redirect to a different page
	}

	async function newScorebookNewSession() {
		let scorebookPreview: ScorebookPreview = {
			date: new Date(),
			home_score: 0,
			away_score: 0
		};
		scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		newSession(scorebookPreview);
		sortScorebooks();
	}

</script>

<h1>Scorebooks</h1>
<button on:click={() => {showNewScorebookModal = !showNewScorebookModal;}}>New Scorebook</button>
<div>
	<ul>
		{#each scorebookPreviews as scorebook}
			<li>
				{#if scorebook.game_id === undefined}
					New Game
				{:else}
					Date: {scorebook.date} Home: {scorebook.home} Away: {scorebook.away}
				{/if}
				<button on:click={() => goToScorebook(scorebook.game_id)}>Edit</button>
				{#if scorebook.session === undefined}
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
	<button on:click={ () => { newScorebookNewSession() } }>New Session</button>
	<br>
	<button on:click={ () => { newScorebookEdit() } }>Edit</button>
</Modal>

<Confirm bind:show={showEndSessionModal} on:confirm={ () => { endSession(selectedScorebook) } }>
	<p>Are you sure you want to end the session? It will kick out anyone working on the scorebook.</p>
</Confirm>

<Confirm bind:show={showDeletionModal} on:confirm={ () => { deleteScorebook(selectedScorebook) } }>
	<p>Are you sure you want to delete this scorebook? This action is irreversible.</p>
</Confirm>