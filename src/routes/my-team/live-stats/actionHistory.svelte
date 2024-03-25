<script lang="ts">
    import { ActionType, type ScorebookAction, type Shot } from "$lib/scorebook";
    import { onMount } from "svelte";

    var actions: Array<ScorebookAction> = new Array<ScorebookAction>();

    onMount(() => {
        var shot: Shot = {
            actionType: ActionType.Shot,
            by: 1n,
            goal: false,
            date: new Date(),
        }
        actions = [...actions, shot];
    });
</script>

{#each actions as action}
    <li>
        {action.date}
    </li>
{/each}