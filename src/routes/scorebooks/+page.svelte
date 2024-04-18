<script lang="ts">
	import { apiPost, deleteScorebookSession, postScorebookSession } from "$lib/api";	
	import { onMount } from "svelte";
	import type { PageServerData } from "../$types";
	import { disableScrollHandling, goto } from "$app/navigation";
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
		await addOldScorebooks();
		await addNewScorebooks();
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
					session_id: BigInt(sessions[0]["session_id"]),
					game_id: BigInt(sessions[0]["game_id"]),
					coach_id: BigInt(sessions[0]["coach_id"]),
					room_code: sessions[0]["room_code"],
					expire_time: BigInt(sessions[0]["expire_time"])
				};
			}
			scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		}
	}

	/**
	 * Queries sessions that have uninitialized games
	 */ 
	async function addNewScorebooks() {
		const sessions = await (await fetch(`/api/sessions?coach_id=${data.locals.coach.coach_id}`)).json();
		for (let session of sessions) {
			if (scorebookPreviews.find((preview) => preview.game_id == session.game_id) === undefined) {
				session = session as ScorebookSession;
				let scorebookPreview: ScorebookPreview = {
					game_id: session.game_id,
					date: new Date(),
					session: session
				};
				scorebookPreviews = [...scorebookPreviews, scorebookPreview];
			}
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
		let game = await newGame();
		let scorebookPreview: ScorebookPreview = {
			game_id: game.game_id,
			date: new Date(),
			home_score: 0,
			away_score: 0
		};
		scorebookPreviews = [...scorebookPreviews, scorebookPreview];
		newSession(scorebookPreview);
		sortScorebooks();
		showNewScorebookModal = false;
	}

	/**
	 * Redirects the coach to a scorebook
	 * @param id The `game_id` of the scorebook
	 */
	async function editScorebook(id) {
		await goto(`/scorebooks/${id}`);
	}
	
	async function newGame() {
		return apiPost("/api/games", { 
			game_date: new Date(),
			game_field: '',
			published: false,
			refs: [],
			scorekeepers: [],
			timekeepers: []
		});
	}
	
	async function newScorebookEdit() {
		showNewScorebookModal = false;
		editScorebook((await newGame()).game_id);		
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
<main>
	<h1>Scorebooks</h1>
	<div class="btnContainer">
		<div class="buttons">
			<button on:click={ () => { showNewScorebookModal = true }}>New Scorebook</button>
		</div>
	</div>
	{#each scorebookPreviews as scorebook}
		<div class="scorebookContainer">
			<div class="scorebook">
				{#if scorebook.home === undefined || scorebook.away === undefined}
					<div class="scDate">
						<div class="scText">
							New Game
						</div>
					</div>
					<div class="scHome">
						<div class="scText">
							Home Team: None
						</div>
					</div>
					<div class="scAway">
						<div class="scText">
							Away Team: None
						</div>
					</div>
				{:else}
					<div class="scDate">
						<div class="scText">
							Date: {scorebook.date.toLocaleDateString()}
						</div>
					</div> 
					<div class="scHome">
						<div class="scText">
							Home: {scorebook.home}
						</div>
					</div>
					<div class="scAway">
						<div class="scText">
							Away: {scorebook.away}
						</div>
					</div>
				{/if}
				<div class="scBtnContainer">
					<div class="scButtons">
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
				</div>
			</div>
		</div>
	{/each}
</main>

<!--Modal for making a new scoreboook-->
<Modal bind:show={showNewScorebookModal}>
	<div class="newSK">
		<div class="btnContainer">
			<div class="buttons">
				<button class="modal" on:click={ () => { newScorebookNewSession() } }>New Session</button>
			</div>
		</div>
		<div class="btnContainer">
			<div class="buttons">
				<button class="modal" on:click={ () => { newScorebookEdit() } }>Edit</button>
			</div>
		</div>
	</div>
</Modal>

<!--Modal for end session confirmation-->
<Confirm bind:show={showEndSessionModal} on:confirm={ () => { endSession(selectedScorebook) } }>
	<h1></h1>
	<p>Ending the session will kick out anyone working on the scorebook.</p>
</Confirm>

<!--Modal for delete scorebook confirmation-->
<Confirm bind:show={showDeletionModal} on:confirm={ () => { deleteScorebook(selectedScorebook) } }>
	<p>Doing so will delete the scorebook. This action is irreversible.</p>
</Confirm>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 15px;
        margin-right: 115px;
		
    }

	h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

	.scorebook {
		height: 35px;
		width: 98%;
		margin-top: 15px;
		margin-left: 1%;
		margin-bottom: 15px;
	}

	.scDate {
		background-color: #88c070;
		background-position: center;
		color: white;
		text-align: center;
		height: inherit;
		line-height: 35px;
		width: 15%;
		transform: skew(-12deg);
	}

	.scHome, .scAway {
		background-color: #346856;
		background-position: center;
		color: white;
		text-align: center;
		height: inherit;
		line-height: 35px;
		width: 25%;
		transform: skew(-12deg);
	}

	.scBtnContainer {
		background-color: #081820;
		background-position: center;
		color: white;
		text-align: center;
		height: inherit;
		line-height: 35px;
		width: 33%;
		transform: skew(-12deg);
	}

	.scDate, .scHome, .scAway, .scBtnContainer {
		display: inline-block;
		font-size: 20px;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
	}

	.scText, .scButtons {
		transform: skew(12deg);
		font-kerning: normal;
		font-weight: 1;
	}

	.btnContainer {
        padding-top: 10px;
        height: 75px;
        position: relative;
    }

	.buttons {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

	button {
        font-size: 20px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
        font-style: italic;
        color: white;
        background-color: #88c070;
        border: none;
        transform: skew(-12deg);
        padding-right:12px;
        box-shadow: 2px 2px 0 #081820;
    }

	button.modal {
		font-size: 35px;
	}

	button:hover {
        background-color: #346856;
        cursor: pointer;
    }

	.newSK{
		width: 350px;
		height: 160px;
	}

	p {
		text-align: center;
	}
</style>