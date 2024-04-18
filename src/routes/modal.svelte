<script>
	export let loginModal = false; // boolean
    export let signupModal = false; // boolean

	let loginDialog; // HTMLDialogElement
    let signupDialog; // HTMLDialogElement

	$: if (loginDialog && loginModal) loginDialog.showModal();
    $: if (signupDialog && signupModal) signupDialog.showModal();

    function closeAll() {
        loginDialog.close();
        signupDialog.close();
        loginModal = false;
        signupModal = false;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={loginDialog}
	on:close={() => (loginModal = false)}
	on:click|self={() => loginDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
	</div>
</dialog>

<dialog
	bind:this={signupDialog}
	on:close={() => (signupModal = false)}
	on:click|self={() => closeAll()} 
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 150em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
