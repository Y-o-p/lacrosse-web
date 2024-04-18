<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Modal from "./modal.svelte";

    const dispatch = createEventDispatcher();

	export let show: boolean;
</script>

<Modal bind:show={ show }>
    <h1 slot="header">Are You Sure?</h1>
    <slot />
    <div class="btnContainer">
        <div class="buttons">
            <button on:click={ () => { dispatch('confirm'); show = false; } }>Yes</button>
            <button on:click={ () => { show = false } }>No</button>
        </div>
    </div>
</Modal>

<style>
    h1 {
        margin-top: 0;
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    .btnContainer {
        padding-top: 10px;
        height: 75px;
        position: relative;
    }

	.buttons {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

	button {
        font-size: 35px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
        font-style: italic;
        color: white;
        background-color: #88c070;
        border: none;
        transform: skew(-12deg);
        padding-right:12px;
        box-shadow: 2px 2px 0 #081820;
    }

    button:hover {
        background-color: #346856;
        cursor: pointer;
    }
</style>