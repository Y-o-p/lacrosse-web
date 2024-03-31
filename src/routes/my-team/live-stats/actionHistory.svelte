<script lang="ts">
    import { actionToString, ActionType, performAction, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { createEventDispatcher, onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { slide, fade, fly } from "svelte/transition";
    const dispatch = createEventDispatcher();
    export var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
    export var selectedAction: number;
    import FaSolidUndoAlt from "virtual:icons/fa-solid/undo-alt";
    var game_id: bigint;
    onMount(() => {
        
    });

    function undo(action: ScorebookAction) {
        performAction(action, true);
        const i = actions.indexOf(action);
		actions.splice(i, 1);
		actions = actions;
        selectedAction = null;
    }

</script>

<div class="game-history">
    <slot name="header" />
    <div class="actions-container">
        {#each actions as action (action.date)}
            <div class="action" in:fade out:fly={{x: 50}} animate:flip={{ duration: 400 }}>
                <span class="action-time">{action.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span class="action-details">{actionToString(action)}</span>
                <button class="action-button edit" on:click={ () => { selectedAction = actions.indexOf(action); dispatch("edit"); }}>Edit</button>
                <button class="action-button undo" on:click={ async () => undo(action) }><FaSolidUndoAlt /></button>
            </div>
        {/each}
    </div>
</div>

<style>
    
    /* Style for game history container */
    .game-history {
        background-color: #f2f2f2;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        min-height: 300px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    /* Style for action container */
    .actions-container {
        max-height: 220px;
        overflow-y: scroll;
    }

    /* Style for each action */
    .action {
        padding: 10px;
        margin-bottom: 5px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>