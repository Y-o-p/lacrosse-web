<script>
	export let home_shotModal; // boolean
	export let home_turnoverModal;
	export let away_turnoverModal;


	let shotDialog; // HTMLDialogElement
	let turnoverDialog;
	let away_turnoverDialog;

	$: if (shotDialog && home_shotModal) shotDialog.showModal();
	$: if (turnoverDialog && home_turnoverModal) turnoverDialog.showModal();
	$: if (away_turnoverDialog && away_turnoverModal) away_turnoverDialog.showModal();
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={shotDialog}
	on:close={() => (home_shotModal = false)}
	on:click|self={() => shotDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<dialog
	bind:this={away_turnoverDialog}
	on:click={() => (away_turnoverModal = false)}
	on:click|self={() => away_turnoverDialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<dialog
	bind:this={turnoverDialog}
	on:click={() => (home_turnoverModal = false)}
	on:click|self={() => turnoverDialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
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
