<script lang="ts">
    import { undoAction, ActionType, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { onMount } from "svelte";

    var actions: Array<ScorebookAction> = new Array<ScorebookAction>();
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
    }

</script>

{#each actions as action}
    <li>
        {action.date}
        <button>Edit</button>
        <button on:click={ async () => undo(action) }>Undo</button>
    </li>
{/each}