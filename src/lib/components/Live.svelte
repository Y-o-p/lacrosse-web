<script lang="ts">
    import Modal from '$lib/modal.svelte';
    import ActionHistory from './ActionHistory.svelte';
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import type { Snapshot } from "./$types";
    import { type ScorebookAction, ActionType, performAction } from '$lib/scorebook';
    import { apiCall, getGame, getTeamStatsFromGame, patchGame } from '$lib/api';

    // ROSTER DATA
    export let game;
    export let homePlayers;
    export let awayPlayers;
    export let homeLineup;
    export let awayLineup;
    let homeTeamScore = 0;
    let awayTeamScore = 0;
    let homeTeamName = ""; 
    let awayTeamName = ""; 
    $: selectedPlayers = newAction.home ? homePlayers : awayPlayers;
    $: unselectedPlayers = newAction.home ? awayPlayers : homePlayers;
    $: selectedLineup = newAction.home ? homeLineup : awayLineup;
    $: unselectedLineup = newAction.home ? awayLineup : homeLineup;

    let personalFouls = ["Cross-Check", "Body-Check", "Crosse", "Equipment", "Slashing", "Tripping", "Unsportsmanlike Conduct"];
    let technicalFouls = ["Holding", "Illegal Procedure", "Interference", "Offsides", "Pushing", "Warding", "Withholding Ball"];
    let foul = 0;
    let penaltyTimes = ["0:30", "1:00", "1:30", "2:00", "2:30", "3:00"];

    // Update player_stats table to include new row for each 
    // in both rosters

    let modals: Array<boolean> = new Array<boolean>(Object.keys(ActionType).length);
    $: currentModal = modals.findIndex((value) => (value == true))

    // Actions
    let scorebookActions: Array<ScorebookAction> = new Array<ScorebookAction>();
    let selectedAction = -1;
    let newAction = {
        actionType: null,
        home: false,
        time: null,
        by: null,
        goal: false,
        assistedBy: null,
        savedBy: null,
        causedBy: null,
        duration: 0,
        homePlayer: null,
        awayPlayer: null,
        homeWon: false,
        successful: false
    };
    $: newAction.actionType = currentModal;
         //used for the half time button to navigate to the review page
         function goToHalftimeReview(gameId: number) {
  window.open(`/my-team/halftime-review/${gameId}`, '_blank');
}

    export const snapshot: Snapshot<Array<ScorebookAction>> = {
        capture: () => scorebookActions,
        restore: (actions) => {
            actions.forEach((action) => {
                action.date = new Date(action.date);
            });
            scorebookActions = actions;
        }
    };

    function beforeUnload(event) {
        event.preventDefault();
        event.returnValue = '';
        return '...';
    }

    let quarterLength = 15;
    let currentTime = 0;
    let interval;
    let timeoutActive = false; // Track if timeout is active

    const startClock = () => {
        if (!interval) { // Check if interval is not already running
            interval = setInterval(() => {
                currentTime++;
            }, 1000);
        }
    };

    onMount(async () => {
        startClock();
        homeTeamName = (await apiCall<Team>("GET", `/api/teams/${game.hometeam_id}`)).team_name;
        awayTeamName = (await apiCall<Team>("GET", `/api/teams/${game.awayteam_id}`)).team_name;
        getScores();
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSelection = (event) => {
    
    };

    // Function to toggle timeout
    const toggleTimeout = () => {
        if (interval) {
            clearInterval(interval); // If interval is running, stop the clock
            interval = null; // Reset interval variable
        } else {
            startClock(); // If interval is not running, start the clock
        }
    };


    function handleNewAction(type: ActionType, home = true) {
        newAction.home = home;
        modals[type] = true;
        selectedAction = null;
        
    }

    async function getScores() {
        const homeTeamStats = await getTeamStatsFromGame(game.hometeam_id, game.game_id);
        const awayTeamStats = await getTeamStatsFromGame(game.awayteam_id, game.game_id);
        homeTeamScore = homeTeamStats.reduce((partialGoalsSum, stats) => partialGoalsSum + stats.goals, 0);
        awayTeamScore = awayTeamStats.reduce((partialGoalsSum, stats) => partialGoalsSum + stats.goals, 0);
    }

    async function handleSubmitAction() {
        if (selectedAction === null) {
            // New Action
            newAction.time = formatTime(currentTime);
            try {
                await performAction(newAction); 
                scorebookActions = [newAction, ...scorebookActions];
            }
            catch {
                alert("Could not submit action");
            }
        }
        else {
            // Edit Action
            try {
                performAction(scorebookActions[selectedAction], true);
                performAction(newAction);
                scorebookActions[selectedAction] = newAction;
            }
            catch {
                alert("Could not edit action");
            }
        }
        newAction = Object.assign({}, newAction);
        getScores();
    }

    async function publish() {
        let newGame = await getGame(game.game_id);
        newGame.published = true;
        await patchGame(newGame);
        game = newGame;
    }

    // Reactive declaration to reset options when no modal is open
    $: {
        if (!modals[ActionType.Shot] &&
            !modals[ActionType.Turnover] &&
            !modals[ActionType.ClearAttempted] &&
            !modals[ActionType.Penalty] &&
            !modals[ActionType.GroundBall] &&
            !modals[ActionType.Faceoff]) {
            resetOptions();
        }
    }

    function resetOptions() {
        newAction.by = null;
        newAction.assistedBy = null;
        newAction.savedBy = null;
        newAction.causedBy = null;
        newAction.homePlayer = null;
        newAction.awayPlayer = null;
        newAction.duration = null;
    }
</script>

<svelte:window on:beforeunload={beforeUnload}/>

<main>
    <div>    
        <div class="team-container">
            <h2 class="hName">Home Team: {homeTeamName}</h2>
            <div class="teamBtn-container">
                <div class="teamButtons">
                    <button class="shotBtn" on:click={() => {handleNewAction(ActionType.Shot);}}>Shot</button>
                    <button class="toBtn" on:click={() => {handleNewAction(ActionType.Turnover);}}>Turnover</button>
                    <button class="clearBtn" on:click={() => {handleNewAction(ActionType.ClearAttempted);}}>Clear</button>
                    <button class="penBtn" on:click={() => {handleNewAction(ActionType.Penalty);}}>Penalty</button>
                    <button class="gbBtn" on:click={() => {handleNewAction(ActionType.GroundBall);}}>Ground Ball</button>
                    <button class="subBtn" on:click={() => {handleNewAction(ActionType.Sub);}}>Sub</button>
                </div>
            </div>
        </div>

        <hr class="homehr"/>
    
        <ActionHistory 
        bind:actions={scorebookActions} 
        bind:selectedAction={selectedAction}
        on:edit={() => {
            modals[scorebookActions[selectedAction].actionType] = true;
            newAction = Object.assign({}, scorebookActions[selectedAction]); 
        }}
        on:undo={() => {
            getScores();
        }}>
            <div slot="header">
                <table>
                    <tr>
                        <th class="action-list-header">{formatTime(currentTime)}</th> 
                        <th class="action-list-header">{homeTeamScore} - {awayTeamScore}</th>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                </table>
            </div>

            <div slot="footer">
                <button class="footerBtn" on:click={() => {handleNewAction(ActionType.Faceoff);}}>Faceoff</button>
                <button class="footerBtn" on:click={toggleTimeout}>Timeout Toggle</button>
                <button class="footerBtn" on:click={() => goToHalftimeReview(game.game_id)}>Half Time</button>
                <button class="footerBtn" on:click={() => { publish() }}>End Game</button>
            </div>
        </ActionHistory>

        <div class="team-container">
            <h2 class="aName">Away Team: {awayTeamName}</h2>
            <div class="teamBtn-container">
                <div class="teamButtons">
                    <button class="shotBtn" on:click={() => {handleNewAction(ActionType.Shot, false);}}>Shot</button>
                    <button class="toBtn" on:click={() => {handleNewAction(ActionType.Turnover, false);}}>Turnover</button>
                    <button class="clearBtn" on:click={() => {handleNewAction(ActionType.ClearAttempted, false);}}>Clear</button>
                    <button class="penBtn" on:click={() => {handleNewAction(ActionType.Penalty, false);}}>Penalty</button>
                    <button class="gbBtn" on:click={() => {handleNewAction(ActionType.GroundBall, false);}}>Ground Ball</button>
                    <button class="subBtn" on:click={() => {handleNewAction(ActionType.Sub, false);}}>Sub</button>
                </div>
            </div>
        </div>
        <hr class="awayhr"/>
    </div>
</main>

<Modal bind:show={modals[ActionType.Faceoff]}>
    <h1 class="mHeader" slot="header">FACEOFF</h1>
    <form>
        <div class="faceoff-modal" style="display: table;">
            <label for={newAction.homePlayer}>Home Player:</label>
            <select bind:value={newAction.homePlayer} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => { 
                newAction.homeWon = true; 
                handleSubmitAction();
            } }>Won</button>
            <hr class="modalHr" />
            
            <label for={newAction.awayPlayer}>Away Player:</label>
            <select bind:value={newAction.awayPlayer} on:change={handleSelection} required>
                <option value={null}>Defensive Player</option>
                {#each unselectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => { 
                newAction.homeWon = false;
                handleSubmitAction(); 
            } }>Won</button>
        </div>
    </form>
</Modal>

<!-- HOME SHOT MODAL -->
<Modal bind:show={modals[ActionType.Shot]}>
    <h1 class="mHeader" slot="header">SHOT ATTEMPT</h1>
    <form>
        <div class="shot-modal" style="display: table;">
            <label for={newAction.by}>Shot by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Select Player</option>
                {#each selectedLineup.filter(e => e != newAction.assistedBy) as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <label for={newAction.assistedBy}>Assisted By:</label>
            <select bind:value={newAction.assistedBy} on:change={handleSelection}>
                <option value={null}>Select Assist</option>
                {#each selectedLineup.filter(e => e != newAction.by) as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr class="modalHr" />
        </div>

        {#if newAction.savedBy == null}
            <div class="mBtnContainer">
                <div class="mButtons">
                    <button type="submit" on:click={() => { 
                        newAction.goal = true;
                        handleSubmitAction(); 
                    }}>Goal</button>
                    <button type="submit" on:click={() => { 
                        newAction.goal = false;
                        handleSubmitAction(); 
                    }}>Shot on Goal</button>
                    <button type="submit" on:click={() => { 
                        newAction.goal = false;
                        handleSubmitAction(); 
                    }}>Shot Missed</button>
                </div>
            </div>
            <hr class="modalHr" />
        {/if}

        <div class="shot-modal" style="display: table;">
            <label for={newAction.savedBy}>Saved By:</label>
            <select bind:value={newAction.savedBy} on:change={handleSelection}>
                <option value={null}>Select Save</option>
                {#each unselectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>

            {#if newAction.savedBy != null}
                <script>
                    newAction.savedBy = null;
                </script>
            {/if}

            <!-- If savee selected, show Shot Saved button
                prevents button be pressed without a savee -->
            {#if newAction.savedBy != null}
                <button class="savedbyButton" type="submit" on:click={() => { 
                    newAction.goal = false;
                    handleSubmitAction(); 
                }}>Shot Saved</button>
            {/if}
        </div>
    </form>
    
</Modal>

<Modal bind:show={modals[ActionType.Turnover]}>
    <h1 class="mHeader" slot="header">TURNOVER</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <div class="modalElement">
                <label for={newAction.by}>Made by:</label>
                <select bind:value={newAction.by} on:change={handleSelection} required>
                    <option value={null}>Offensive Player</option>
                    {#each selectedPlayers as player}
                        <option value={player}>{player.last_name}</option>
                    {/each}
                </select>
            </div>
            <hr class="modalHr" />
            <div class="modalElement">
                <label for={newAction.causedBy}>Caused By:</label>
                <select bind:value={newAction.causedBy} on:change={handleSelection}>
                    <option value={null}>Defensive Player</option>
                    {#each unselectedPlayers as player}
                        <option value={player}>{player.last_name}</option>
                    {/each}
                </select>
            </div>
            <hr class="modalHr" />
            <button type="submit" on:click={() => {handleSubmitAction()}}>Complete Turnover</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.ClearAttempted]}>
    <h1 class="mHeader" slot="header">CLEAR</h1>
    <form>
        <div class="clear-modal" style="display: table;">
            <label for={newAction.by}>Clear by:</label>
            <select bind:value={newAction.by} on:change={handleSelection}>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr class="modalHr" />
            <button class="mBtn" type="submit" on:click={() => { 
                newAction.successful = false;
                handleSubmitAction(); 
            }}>Unsuccessful</button>
            <button class="mBtn" type="submit" on:click={() => { 
                newAction.successful = true;
                handleSubmitAction(); 
            }}>Successful</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.Penalty]}>
    <h1 class="mHeader" slot="header">PENALTY</h1>
    <form>
        <div class="penalty-modal" style="display: table;">
            <label for={newAction.by}>Penalty by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <label>
                <h3>Personal Foul</h3>
                {#each personalFouls as personalFoul}
                    <div>
                        <input type="radio" value={personalFoul} bind:group={foul}/>
                        {personalFoul}
                    </div>
                {/each}
                <h3>Technical Foul</h3>
                {#each technicalFouls as technicalFoul}
                    <div>
                        <input type="radio" value={technicalFoul} bind:group={foul}/>
                        {technicalFoul}
                    </div>
                {/each}
            </label>
            <div class="modalElement">
                <label for={newAction.duration}>Duration:</label>
                <select bind:value={newAction.duration} on:change={handleSelection} required>
                    {#each penaltyTimes as time}
                        <option value={time}>{time}</option>
                    {/each}
                </select>

                <button class="mBtn" type="submit" on:click={() => {handleSubmitAction()}}>Submit</button>
            </div>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.GroundBall]}>
    <h1 class="mHeader" slot="header">GROUNDBALL RECOVERED</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for={newAction.by}>Offensive Player:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button class="mBtn" type="submit" on:click={() => { 
                handleSubmitAction(); 
            }}>Submit</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.Sub]}>
    <h1 slot="header">SUBTITUTION</h1>
    <form>
        <div class="sub-modal">
            <label>
                {#each selectedLineup as player}
                    <div>
                        <select bind:value={player} on:change={handleSelection} required>
                            {#each selectedPlayers.filter(n => n == player || !selectedLineup.includes(n)) as sub}
                                <option value={sub}>#{sub.jersey_num} {sub.last_name}</option>
                            {/each}
                        </select>
                    </div>
                {/each}
            </label>
        </div>
    </form>
</Modal>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 0px;
        margin-right: 115px;
        width: 100%;
    }

    h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h1.mHeader {
        margin-top: 0;
        padding-left: 10px;
        padding-right: 10px;
    }

    h2 {
        background-color: #081820;
        position: relative;
        color: white;
        width: 75%;
        font-size: 40px;
        text-align: center;
        top: 30px;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
    }

    h2.hName, hr.homehr {
        background-color: #ffc75e;
        box-shadow: none;
    }

    h2.aName, hr.awayhr {
        background-color: #5e69ff;
        box-shadow: none;
    }

    h3 {
        background-color: #346856;
        position: relative;
        color: white;
        width: 105%;
        font-size: 35px;
        
    }

    hr {
        margin-top: 25px;
        height: 10px;
        width: 75%;
    }

    hr.modalHr {
        visibility: hidden;
    }

    label {
        margin-right: 5px;
        margin-left: 10px;
    }

    .team-container {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        text-align: center;
    }

    .teamBtn-container, .mBtnContainer {
        padding-top: 0px;
        height: 20px;
        position: relative;
    }

	.teamButtons, .mButtons {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        max-width: 100%;
    }

    .faceoff {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
    }

    .shotBtn {
        background-color: red;
        font-size: 35px;
    }
    .toBtn {
        background-color: green;
        font-size: 35px;
    }
    .clearBtn {
        background-color: navy;
        font-size: 35px;
    }
    .penBtn {
        background-color: peru;
        font-size: 35px;
    }
    .gbBtn {
        background-color: #6C3B1C;
        font-size: 35px;
    }
    .subBtn {
        background-color: blueviolet;
        font-size: 35px;
    }

    .shotBtn, .toBtn, .clearBtn, .penBtn, .gbBtn, .subBtn, .footerBtn{
        margin-left: 10px;
        margin-right: 10px;
    }

    button {
        font-size: 25px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
        font-style: italic;
        color: white;
        background-color: #88c070;
        border: none;
        transform: skew(-12deg);
        padding-right:12px;
        box-shadow: 2px 2px 0 #081820;
        max-width: 200px;
    }

    button:hover {
        background-color: #346856;
        cursor: pointer;
    }

    .mBtn {
        margin-left: 10px;
        margin-right: 10px;
    }

    .turnover-modal, .shot-modal, .clear-modal, .penalty-modal, .sub-modal, .faceoff-modal {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .savedbyButton {
        margin-left: 20px;
    }
</style>