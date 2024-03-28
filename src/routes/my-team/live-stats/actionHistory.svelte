<script lang="ts">
    import { undoAction, ActionType, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
    export var selectedAction: number;
    var game_id: bigint;

    onMount(() => {
        var shot: Shot = {
            actionType: ActionType.Shot,
            by: 1n,
            goal: false,
            date: new Date(),
        }
        actions = [...actions, shot];
    });

    function undo(action: ScorebookAction) {
        undoAction(game_id, action);
        const i = actions.indexOf(action);
		actions.splice(i, 1);
		actions = actions;
        selectedAction = null;
    }

</script>

{#each actions as action}
    <li>
        {action.date}
        <button on:click={ () => { selectedAction = actions.indexOf(action); dispatch("edit"); }}>Edit</button>
        <button on:click={ async () => undo(action) }>Undo</button>
    </li>
{/each}