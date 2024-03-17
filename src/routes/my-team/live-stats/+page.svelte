<script lang="ts">
    import Modal from './scorebookModal.svelte';
    import { onMount, onDestroy } from 'svelte';

    import type { PageServerData } from "./$types";
    export let data: PageServerData;    // Locals {props.homePlayers & props.coach}

    // Home Modal Delcatations
    let home_shotModal = false;
    let home_turnoverMadeModal = false;
    let home_clearAttemptedModal = false;
    let home_penaltyModal = false;
    let home_faceoffModal = false;
    let home_subModal = false;
    let home_groundBallModal = false;
    let home_timeoutModal = false;

    // Away Modal Delcatations
    let away_shotModal = false;
    let away_turnoverMadeModal = false;
    let away_clearAttemptedModal = false;
    let away_penaltyModal = false;
    let away_faceoffModal = false;
    let away_subModal = false;
    let away_groundBallModal = false;
    let away_timeoutModal = false;

    // Empty strings for select *options*
    let selectedShooter = '';
    let selectedPlayer = '';

    let home_players_roster = data.props.homePlayers; // Set Home Roster
    let away_players = ['Player A', 'Player B', 'Player C']; // Default away players

    let quarterLength = 15;
    let currentTime = 0;
    let interval;

    const startClock = () => {
        interval = setInterval(() => {
            currentTime++;
            if (currentTime >= quarterLength * 60) {
                clearInterval(interval);
                currentTime = 0;
            }
        }, 1000);
    };

    onMount(() => {
        startClock();
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSelection = (event) => {
        selectedPlayer = event.target.value;
    };
</script>

<div>
    <h2>{formatTime(currentTime)}</h2>

    <div>
        <h1>Home Team</h1>
        <button on:click={() => (home_shotModal = true)}>Shot</button>
        <button on:click={() => (home_turnoverMadeModal = true)}>Turnover Made</button>
        <button on:click={() => (home_clearAttemptedModal = true)}>Clear Attempted</button>
        <button on:click={() => (home_penaltyModal = true)}>Penalty</button>
        <button on:click={() => (home_faceoffModal = true)}>Faceoff</button>
        <button on:click={() => (home_subModal = true)}>Sub</button>
        <button on:click={() => (home_groundBallModal = true)}>Ground Ball</button>
        <button on:click={() => (home_timeoutModal = true)}>Timeout</button>
    </div>

    <div>
        <h1>Away Team</h1>
        <button on:click={() => (away_shotModal = true)}>Shot</button>
        <button on:click={() => (away_turnoverMadeModal = true)}>Turnover Made</button>
        <button on:click={() => (away_clearAttemptedModal = true)}>Clear Attempted</button>
        <button on:click={() => (away_penaltyModal = true)}>Penalty</button>
        <button on:click={() => (away_faceoffModal = true)}>Faceoff</button>
        <button on:click={() => (away_subModal = true)}>Sub</button>
        <button on:click={() => (away_groundBallModal = true)}>Ground Ball</button>
        <button on:click={() => (away_timeoutModal = true)}>Timeout</button>
    </div>



</div>


<!-- Home "Shot" Modal -->
<Modal bind:home_shotModal>
    <h1 slot="header">SHOT ATTEMPT</h1>
    <label for="playerSelect">Shot by:</label>
    <select bind:value={selectedShooter} on:change={handleSelection}>
        <option value="">Select Player</option>
        {#each home_players_roster as player}
            <option value={player.player_id}>{player.last_name}</option>
        {/each}
    </select>
    <hr />
    <button>Shot Made</button>
    <button>Shot Missed/Wide</button>
    <label for="awayPlayerSelect">Saved By:</label>
    <select bind:value={selectedPlayer} on:change={handleSelection}>
        <option value="">Select Savee</option>
        {#each away_players as player}
            <option value={player}>{player}</option>
        {/each}
    </select>
</Modal>
