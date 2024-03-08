<script lang="ts">
	import { deleteScorebookSession, postScorebookSession } from "$lib/api";	
	import { onMount } from "svelte";
	import type { PageServerData } from "../$types";
	import { goto } from "$app/navigation";
	import { getTeam } from "$lib/api";
	import Modal from "./modal.svelte";
	import Confirm from "./confirm.svelte";
    import { copyToClipboard } from "$lib/util";
	
	export let data: PageServerData;
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
	let scorebookPreviews: Array<ScorebookPreview> = new Array<ScorebookPreview>();
	let selectedScorebook: ScorebookPreview;
	let showDeletionModal = false;
	let showNewScorebookModal = false;
	let showEndSessionModal = false;

	onMount( async () => {
		await addNewScorebooks();
		await addOldScorebooks();
		sortScorebooks();
	});

	/**
	 * Queries games and populates the `scorebookPreviews` list
	 */ 
	async function addOldScorebooks() {
		// Get all the games related to the coach.
		const homeTeamResult = await (await fetch(`/api/games?hometeam_id=${data.locals.coach.team_id}`)).json();
		const awayTeamResult = await (await fetch(`/api/games?awayteam_id=${data.locals.coach.team_id}`)).json();
		const gameRows = [...homeTeamResult, ...awayTeamResult];
		for (let game of gameRows) {
			const homeTeam: Team = await getTeam(game["hometeam_id"]);
			const awayTeam: Team = await getTeam(game["awayteam_id"]);
			let scorebookPreview: ScorebookPreview = {
				game_id: game["game_id"],
				date: new Date(game["game_date"]),
				home: homeTeam.team_name,
				away: awayTeam.team_name,
				home_score: 0, //TODO: query score information through player-stats
				away_score: 0,
				field: game["game_field"]
            };
			// If it has a session, add it
			const sessions = await (await fetch(`/api/sessions?game_id=${game["game_id"]}&coach_id=${data.locals.coach.coach_id}`)).json();
			if (sessions.length > 0) {
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

	/**
	 * Queries sessions that have no `game_id` and populates the `scorebookPreviews` list
	 */ 
	async function addNewScorebooks() {
		// Get the sessions that don't have a related game.
		const sessions = await (await fetch(`/api/sessions?game_id=null`)).json();
		for (let session of sessions) {
			session = {
				session_id: BigInt(session["session_id"]),
				coach_id: BigInt(session["coach_id"]),
				room_code: session["room_code"],
				expire_time: BigInt(session["expire_time"])
			};
			let scorebookPreview: ScorebookPreview = {
				date: new Date(),
				session: session
			};
			scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		}
	}

	/**
	 * Sorts the scorebooks by date
	 */
	function sortScorebooks() {
		scorebookPreviews.sort((a, b) => {
			return b.date - a.date;
		});
		scorebookPreviews = scorebookPreviews;
	}

	/**
	 * Creates a new scorebook session
	 * @param scorebook The scorebook the session is being created for
	 */
	async function newSession(scorebook: ScorebookPreview) {
        scorebook.session = await postScorebookSession({ 
			coach_id: data.locals.coach.coach_id,
			game_id: scorebook.game_id
		});
		scorebookPreviews = scorebookPreviews;
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

	/**
	 * Redirects the coach to a scorebook
	 * @param id The `game_id` of the scorebook
	 */
	async function editScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
	
	async function newScorebookEdit() {
		showNewScorebookModal = false;
		// TODO: redirect to a different page
	}

	/**
	 * Deletes the associated game and player-stats of a scorebook
	 * @param scorebook The scorebook to delete
	 */
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

	async function deletionButton(scorebook: ScorebookPreview) {
		selectedScorebook = scorebook;
		showDeletionModal = true;
	}
	
	/**
	 * Ends a session of a scorebook
	 * @param scorebook The scorebook to end the session on
	 */
	async function endSession(scorebook: ScorebookPreview) {
		const result = await deleteScorebookSession(scorebook.session);
		delete scorebook.session;
		scorebookPreviews = scorebookPreviews;
	}

	async function endSessionButton(scorebook: ScorebookPreview) {
		selectedScorebook = scorebook;
		showEndSessionModal = true;
	}
	
</script>

<!--Scorebook List-->
<h1>Scorebooks</h1>
<button on:click={ () => { showNewScorebookModal = true }}>New Scorebook</button>
<ul>
	{#each scorebookPreviews as scorebook}
		<li>
			{#if scorebook.game_id === undefined}
				New Game
			{:else}
				Date: {scorebook.date} Home: {scorebook.home} Away: {scorebook.away}
			{/if}
			<div>
				<button on:click={ () => editScorebook(scorebook.game_id) }>Edit</button>
				{#if scorebook.session === undefined}
					<button on:click={ () => newSession(scorebook) }>New Session</button>
				{:else}
					{scorebook.session.room_code}
					<button on:click={ () => copyToClipboard(scorebook.session.room_code) }>Copy Code</button>
					<button on:click={ () => endSessionButton(scorebook) }>End Session</button>
				{/if}
				<button on:click={ () => deletionButton(scorebook) }>Delete</button>
			</div>
		</li>
	{/each}
</ul>

<!--Modal for making a new scoreboook-->
<Modal bind:show={showNewScorebookModal}>
	<h2 slot="header">New Scorebook</h2>
	<button on:click={ () => { newScorebookNewSession() } }>New Session</button>
	<br>
	<button on:click={ () => { newScorebookEdit() } }>Edit</button>
</Modal>

<!--Modal for end session confirmation-->
<Confirm bind:show={showEndSessionModal} on:confirm={ () => { endSession(selectedScorebook) } }>
	<p>Are you sure you want to end the session? It will kick out anyone working on the scorebook.</p>
</Confirm>

<!--Modal for delete scorebook confirmation-->
<Confirm bind:show={showDeletionModal} on:confirm={ () => { deleteScorebook(selectedScorebook) } }>
	<p>Are you sure you want to delete this scorebook? This action is irreversible.</p>
</Confirm>