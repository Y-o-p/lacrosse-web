<script>
	// Export Modals (Used in page.svelte via <Modal>)
	export let home_shotModal; // boolean
	export let home_turnoverModal;
	export let home_clearModal;

	export let away_shotModal; // boolean
	export let away_turnoverModal;
	export let away_clearModal;

	export let home_penaltyModal; // boolean
	export let away_penaltyModal;

	export let faceoffModal; // boolean



	// HTML Dialog Elements
	let home_shotDialog; 
	let turnoverDialog;
	let home_clearDialog;


	let away_shotDialog;
	let away_turnoverDialog;
	let away_clearDialog;

	let home_penaltyDialog;
	let away_penaltyDialog;

	let faceoffDialog;



	$: if (home_shotDialog && home_shotModal) home_shotDialog.showModal();
	$: if (turnoverDialog && home_turnoverModal) turnoverDialog.showModal();
	$: if (away_turnoverDialog && away_turnoverModal) away_turnoverDialog.showModal();
	$: if (away_shotDialog && away_shotModal) away_shotDialog.showModal();

	$: if (home_clearDialog && home_clearModal) home_clearDialog.showModal();
	$: if (away_clearDialog && away_clearModal) away_clearDialog.showModal();

	$: if (faceoffDialog && faceoffModal) faceoffDialog.showModal();
	$: if (home_penaltyDialog && home_penaltyModal) home_penaltyDialog.showModal();
	$: if (away_penaltyDialog && away_penaltyModal) away_penaltyDialog.showModal();
	
</script>




<!-- HOME SHOT DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={home_shotDialog}
	on:close={() => (home_shotModal = false)}
	on:click|self={() => home_shotDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- HOME TURNOVER DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={turnoverDialog}
	on:click={() => (home_turnoverModal = false)}
	on:click|self={() => turnoverDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- HOME CLEAR DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={home_clearDialog}
	on:click={() => (home_clearModal = false)}
	on:click|self={() => home_clearDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- AWAY SHOT DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={away_shotDialog}
	on:click={() => (away_shotModal = false)}
	on:click|self={() => away_shotDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- AWAY TURNOVER DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={away_turnoverDialog}
	on:click={() => (away_turnoverModal = false)}
	on:click|self={() => away_turnoverDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- AWAY CLEAR DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={away_clearDialog}
	on:click={() => (away_clearModal = false)}
	on:click|self={() => away_clearDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- FACEOFF DIALOG -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={faceoffDialog}
	on:click={() => (faceoffModal = false)}
	on:click|self={() => faceoffDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- Home Penalty DIALOG-->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={home_penaltyDialog}
	on:click={() => (home_penaltyModal = false)}
	on:click|self={() => home_penaltyDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<!-- Away Penalty DIALOG-->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={away_penaltyDialog}
	on:click={() => (away_penaltyModal = false)}
	on:click|self={() => away_penaltyDialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>



<!-- Styling -->

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
</style>
