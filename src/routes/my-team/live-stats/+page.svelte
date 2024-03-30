<script lang="ts">
    import Modal from '$lib/modal.svelte';
    import ActionHistory from './actionHistory.svelte';
    import { onMount, onDestroy } from 'svelte';

    import type { PageServerData } from "./$types";
    import { type ScorebookAction, ActionType, performAction } from '$lib/scorebook';
    export let data: PageServerData;    // Locals {props.homePlayers & props.coach}

    // ROSTER DATA
    let home_players_roster = data.props.homePlayers; // Set Home Roster
    let away_players_roster = data.props.awayPlayers; // Default away players
    let homeSelected = true;
    $: selectedPlayers = homeSelected ? home_players_roster : away_players_roster;
    $: unselectedPlayers = homeSelected ? away_players_roster : home_players_roster;

    let penaltyTimes = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"];

    // Update player_stats table to include new row for each 
    // in both rosters

    let modals: Array<boolean> = new Array<boolean>(Object.keys(ActionType).length);
    $: currentModal = modals.findIndex((value) => (value == true))

    // Actions
    let scorebookActions: Array<ScorebookAction> = new Array<ScorebookAction>();
    let selectedAction = -1;
    let newAction = {
        actionType: null,
        date: null,
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

    let quarterLength = 15;
    let currentTime = 0;
    let interval;

    const startClock = () => {
        interval = setInterval(() => {
            currentTime++;
        }, 1000);
    };

    onMount(() => {
        startClock();
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
        homeSelected = home;
        modals[type] = true;
        selectedAction = null;
    }

    async function handleSubmitAction() {
        if (selectedAction === null) {
            // New Action
            newAction.date = new Date();
            try {
                await performAction(newAction); 
                scorebookActions = [...scorebookActions, newAction];
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
    }
</script>

<main>
    <div>
        <h2>{formatTime(currentTime)}</h2>
    
        <div>
            <h1>Home Team</h1>
            <button on:click={() => {handleNewAction(ActionType.Shot);}}>Shot</button>
            <button on:click={() => {handleNewAction(ActionType.Turnover);}}>Turnover Made</button>
            <button on:click={() => {handleNewAction(ActionType.ClearAttempted);}}>Clear Attempted</button>
            <button on:click={() => {handleNewAction(ActionType.Penalty);}}>Penalty</button>
            <button on:click={() => {handleNewAction(ActionType.GroundBall);}}>Ground Ball</button>
            <button on:click={() => {handleNewAction(ActionType.Sub);}}>Sub</button>
            <button on:click={() => {handleNewAction(ActionType.Timeout);}}>Timeout</button>
        </div>

        <div>
            <h1>Score</h1>
            <h3>0 - 0</h3>
            <button on:click={() => (handleNewAction(ActionType.Faceoff))}>Faceoff</button>
        </div>
    
        <div>
            <h1>Away Team</h1>
            <button on:click={() => {handleNewAction(ActionType.Shot, false);}}>Shot</button>
            <button on:click={() => {handleNewAction(ActionType.Turnover, false);}}>Turnover Made</button>
            <button on:click={() => {handleNewAction(ActionType.ClearAttempted, false);}}>Clear Attempted</button>
            <button on:click={() => {handleNewAction(ActionType.Penalty, false);}}>Penalty</button>
            <button on:click={() => {handleNewAction(ActionType.GroundBall, false);}}>Ground Ball</button>
            <button on:click={() => {handleNewAction(ActionType.Sub, false);}}>Sub</button>
            <button on:click={() => {handleNewAction(ActionType.Timeout, false);}}>Timeout</button>
        </div>
    
        <ActionHistory 
        bind:actions={scorebookActions} 
        bind:selectedAction={selectedAction}
        on:edit={() => {
            modals[scorebookActions[selectedAction].actionType] = true;
            newAction = Object.assign({}, scorebookActions[selectedAction]); 
            console.log(newAction);
        }}
        ></ActionHistory>

    </div>
</main>

<Modal bind:show={modals[ActionType.Faceoff]} >
    <h1 slot="header">FACEOFF</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for="homePlayerSelect">Home Player:</label>
            <select bind:value={newAction.homePlayer} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => { 
                newAction.homeWon = true; 
                handleSubmitAction();
            } }>Won</button>
            <hr />
            
            <label for="awayPlayerSelect">Away Player:</label>
            <select bind:value={newAction.awayPlayer} on:change={handleSelection} required>
                <option value={null}>Defensive Player</option>
                {#each unselectedPlayers as player}
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
    <h1 slot="header">HOME TEAM SHOT ATTEMPT</h1>
    <form>
        <div class="shot-modal" style="display: table;">
            <label for={null}>Shot by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Select Player</option>
                {#each selectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <label for={null}>Assisted By:</label>
            <select bind:value={newAction.assistedBy} on:change={handleSelection}>
                <option value={null}>Select Assist</option>
                {#each selectedPlayers as player}
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

            <label for="AwaySavee">Saved By:</label>
            <select bind:value={newAction.savedBy} on:change={handleSelection}>
                <option value={null}>Select Save</option>
                {#each unselectedPlayers as player}
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
    <h1 slot="header">HOME TEAM TURNOVER</h1>
    <form>
        <div class="turnover-modal" style="display: table;">
            <label for="playerSelect">Made by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            
            <label for="awayPlayerSelect">Caused By:</label>
            <select bind:value={newAction.causedBy} on:change={handleSelection} required>
                <option value={null}>Defensive Player</option>
                {#each unselectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => {handleSubmitAction()}}>Complete Turnover</button>
        </div>
    </form>
</Modal>

<Modal bind:show={modals[ActionType.ClearAttempted]}>
    <h1 slot="header">HOME TEAM TURNOVER</h1>
    <form>
        <div class="clear-modal" style="display: table;">
            <label for="playerSelect">Clear by:</label>
            <select bind:value={newAction.by} on:change={handleSelection}>
                <option value={null}>Offensive Player</option>
                {#each selectedPlayers as player}
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
    <h1 slot="header">HOME TEAM PENALTY</h1>
    <form>
        <div class="penalty-modal" style="display: table;">
            <label for="playerSelect">Penalty by:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <hr />
            <label for="penaltyDuration">Duration:</label>
            <select bind:value={newAction.duration} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
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
            <label for="homePlayerSelect">Offensive Player:</label>
            <select bind:value={newAction.by} on:change={handleSelection} required>
                <option value={null}>Offensive Player</option>
                {#each selectedPlayers as player}
                    <option value={player}>{player.last_name}</option>
                {/each}
            </select>
            <button type="submit" on:click={() => { 
                handleSubmitAction(); 
            }}>Submit</button>
        </div>
    </form>
</Modal>