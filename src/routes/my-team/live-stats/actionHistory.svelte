<script lang="ts">
    import { actionToString, ActionType, performAction, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
    export var selectedAction: number;
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
        <li>
            {actionToString(action)}
            <button on:click={ () => { selectedAction = actions.indexOf(action); dispatch("edit"); }}>Edit</button>
            <button on:click={ async () => undo(action) }>Undo</button>
        </li>
    {/each}
</div>