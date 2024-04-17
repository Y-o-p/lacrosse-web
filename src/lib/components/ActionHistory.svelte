<script lang="ts">
    import { actionToString, ActionType, performAction, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { createEventDispatcher, onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { slide, fade, fly } from "svelte/transition";
    const dispatch = createEventDispatcher();
    export var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
    export var selectedAction: number;
    import FaSolidTrash from "virtual:icons/fa-solid/trash";
    import Fa6SolidPenToSquare from "virtual:icons/fa6-solid/pen-to-square";
    var game_id: bigint;
    onMount(() => {
        
    });

    async function undo(action: ScorebookAction) {
        await performAction(action, true);
        const i = actions.indexOf(action);
		actions.splice(i, 1);
		actions = actions;
        selectedAction = null;
        dispatch("undo");
    }

</script>

<div class="game-history">
    <slot name="header" />
    <div class="actions-container">
        {#each actions as action (action)}
            <div class="action action-{action.home ? "home" : "away"}" in:fade out:fly={{x: 50}} animate:flip={{ duration: 400 }}>
                <span class="action-time">{action.time}</span>
                <span class="action-details">{action.home ? "HOME" : "AWAY"} {actionToString(action)}</span>
                <button class="action-button edit" on:click={ () => { selectedAction = actions.indexOf(action); dispatch("edit"); }}><Fa6SolidPenToSquare /></button>
                <button class="action-button undo" on:click={ async () => undo(action) }><FaSolidTrash /></button>
            </div>
        {/each}
    </div>
    <slot class="footer" name="footer" />
</div>

<style>
    
    /* Style for game history container */
    .game-history {
        background-color: #f2f2f2;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    /* Style for action container */
    .actions-container {
        flex: 1;
        overflow-y: scroll;
    }

    /* Style for each action */
    .action {
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .action-home {
        background-color: #ffc75e;
    }

    .action-away {
        background-color: #5e69ff;
    }

    /* Style for action time */
    .action-time {
        font-weight: bold;
        margin-right: 10px;
    }

    /* Style for action buttons */
    .action-button {
        background-color: #007bff;
        border: none;
        color: #fff;
        padding: 5px 5px;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    /* Hover effect for action buttons */
    .action-button:hover {
        background-color: #0056b3;
    }

    /* Specific style for the edit button */
    .edit {
        margin-right: 5px;
        margin-left: auto;
    }

    .footer {
        margin-top: auto;
        justify-content: space-between;
        align-items: center;
    }
</style>