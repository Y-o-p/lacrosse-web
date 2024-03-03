<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Modal from "./modal.svelte";

    const dispatch = createEventDispatcher();

	export let show: boolean;
</script>

<Modal bind:show={ show }>
    <h2 slot="header">Are You Sure?</h2>
    <slot />
    <button on:click={ () => { dispatch('confirm'); show = false; } }>Yes</button>
    <button on:click={ () => { show = false } }>No</button>
</Modal>