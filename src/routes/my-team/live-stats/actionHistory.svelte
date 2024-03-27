<script lang="ts">
    import { undoAction, ActionType, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { onMount } from "svelte";

    export var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
    export var currentAction: ScorebookAction;
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
        currentAction = null;
    }

</script>

{#each actions as action}
    <li>
        {action.date}
        <button on:click={ () => { currentAction = action; }}>Edit</button>
        <button on:click={ async () => undo(action) }>Undo</button>
    </li>
{/each}