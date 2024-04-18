<script lang="ts">
    import Modal from '$lib/modal.svelte';
    import ActionHistory from './ActionHistory.svelte';
    import { onMount, onDestroy } from 'svelte';

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

    const startClock = () => {
        interval = setInterval(() => {
            currentTime++;
        }, 1000);
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
</script>

<svelte:window on:beforeunload={beforeUnload}/>

<main>
    <div>    
        <div class="team-container">
            <h1>Home Team: {homeTeamName}</h1>
            <button on:click={() => {handleNewAction(ActionType.Shot);}}>Shot</button>
            <button on:click={() => {handleNewAction(ActionType.Turnover);}}>Turnover Made</button>
            <button on:click={() => {handleNewAction(ActionType.ClearAttempted);}}>Clear Attempted</button>
            <button on:click={() => {handleNewAction(ActionType.Penalty);}}>Penalty</button>
            <button on:click={() => {handleNewAction(ActionType.GroundBall);}}>Ground Ball</button>
            <button on:click={() => {handleNewAction(ActionType.Sub);}}>Sub</button>
            <button on:click={() => {handleNewAction(ActionType.Timeout);}}>Timeout</button>
        </div>
    
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
                <button on:click={() => {handleNewAction(ActionType.Faceoff);}}>Faceoff</button>
                <button>Half Time</button>
                <button on:click={() => { publish() }}>End Game</button>
            </div>
        </ActionHistory>

        <div class="team-container">
            <h1>Away Team: {awayTeamName}</h1>
            <button on:click={() => {handleNewAction(ActionType.Shot, false);}}>Shot</button>
            <button on:click={() => {handleNewAction(ActionType.Turnover, false);}}>Turnover Made</button>
            <button on:click={() => {handleNewAction(ActionType.ClearAttempted, false);}}>Clear Attempted</button>
            <button on:click={() => {handleNewAction(ActionType.Penalty, false);}}>Penalty</button>
            <button on:click={() => {handleNewAction(ActionType.GroundBall, false);}}>Ground Ball</button>
            <button on:click={() => {handleNewAction(ActionType.Sub, false);}}>Sub</button>
            <button on:click={() => {handleNewAction(ActionType.Timeout, false);}}>Timeout</button>
        </div>

    </div>
</main>

<Modal bind:show={modals[ActionType.Faceoff]} >
    <h1 slot="header">FACEOFF</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for={newAction.awayPlayer}>Home Player:</label>
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
            <hr />
            
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
    <h1 slot="header">SHOT</h1>
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
            <hr />

            {#if newAction.savedBy == null}
                <button type="submit" on:click={() => { 
                    newAction.goal = true;
                    handleSubmitAction(); 
                }}>Shot Made</button>
                <button type="submit" on:click={() => { 
                    newAction.goal = false;
                    handleSubmitAction(); 
                }}>Shot Missed/Wide</button>
                <hr />
            {/if}

            <label for={newAction.savedBy}>Saved By:</label>
            <select bind:value={newAction.savedBy} on:change={handleSelection}>
                <option value={null}>Select Save</option>
                {#each unselectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>

            <!-- If savee selected, show Shot Saved button
                prevents button be pressed without a savee -->
            {#if newAction.savedBy != null}
                <button type="submit" on:click={() => { 
                    newAction.goal = false;
                    handleSubmitAction(); 
                }}>Shot Saved</button>
            {/if}
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.Turnover]}>
    <h1 slot="header">TURNOVER</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for={newAction.by}>Made by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            
            <label for={newAction.causedBy}>Caused By:</label>
            <select bind:value={newAction.causedBy} on:change={handleSelection}>
                <option value={null}>Defensive Player</option>
                {#each unselectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => {handleSubmitAction()}}>Complete Turnover</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.ClearAttempted]}>
    <h1 slot="header">CLEAR</h1>
    <form>
        <div class="clear-modal" style="display: table;">
            <label for={newAction.by}>Clear by:</label>
            <select bind:value={newAction.by} on:change={handleSelection}>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <button type="submit" on:click={() => { 
                newAction.successful = false;
                handleSubmitAction(); 
            }}>Unsuccessful</button>
            <button type="submit" on:click={() => { 
                newAction.successful = true;
                handleSubmitAction(); 
            }}>Successful</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.Penalty]}>
    <h1 slot="header">PENALTY</h1>
    <form>
        <div class="penalty-modal" style="display: table;">
            <label for={newAction.by}>Penalty by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <label>
                <h2>Personal Foul</h2>
                {#each personalFouls as personalFoul}
                    <div>
                        <input type="radio" value={personalFoul} bind:group={foul}/>
                        {personalFoul}
                    </div>
                {/each}
                <h2>Technical Foul</h2>
                {#each technicalFouls as technicalFoul}
                    <div>
                        <input type="radio" value={technicalFoul} bind:group={foul}/>
                        {technicalFoul}
                    </div>
                {/each}
            </label>
            <hr />
            <label for={newAction.duration.toString()}>Duration:</label>
            <select bind:value={newAction.duration} on:change={handleSelection} required>
                {#each penaltyTimes as time}
                    <option value={time}>{time}</option>
                {/each}
            </select>

            <button type="submit" on:click={() => {handleSubmitAction()}}>Submit</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.GroundBall]}>
    <h1 slot="header">GROUNDBALL RECOVERED</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for={newAction.by}>Offensive Player:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedLineup as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => { 
                handleSubmitAction(); 
            }}>Submit</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.Sub]}>
    <h1 slot="header">SUBTITUTION</h1>
    <form>
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
    </form>
</Modal>

<style>
    .team-container {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .faceoff {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
</style>