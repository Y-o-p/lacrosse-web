<script lang="ts">
    import { actionToString, ActionType, performAction, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { createEventDispatcher, onMount } from "svelte";
    import { slide } from "svelte/transition";
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

<h1>Game History</h1>
<div style="overflow-y:scroll;max-height: 100px;">
    {#each actions as action}
        <div transition:slide|global>
            {actionToString(action)}
            <button on:click={ () => { selectedAction = actions.indexOf(action); dispatch("edit"); }}>Edit</button>
            <button class="btn" on:click={ async () => undo(action) }><FaSolidUndoAlt /></button>
            

        </div>
    {/each}
</div>
<style>
    /* Style buttons */
    .btn {
        background-color: lightgrey; /* Blue background */
        border: none; /* Remove borders */
        color: white; /* White text */
        padding: 3px 4px; /* Some padding */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
    }

    /* Darker background on mouse-over */
    .btn:hover {
        background-color: RoyalBlue;
    }
</style>