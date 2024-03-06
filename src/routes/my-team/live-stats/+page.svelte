<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;

    import Modal from './scorebookModal.svelte';
    import { onMount, onDestroy } from 'svelte';

    // Page Variables
    let home_shotModal = false;
    let home_turnoverMadeModal = false;
    let home_clearAttemptedModal = false;
    let home_penaltyModal = false;
    let home_faceoffModal = false;
    let home_subModal = false;
    let home_groundBallModal = false;
    let home_timeoutModal = false;
    
    let away_shotModal = false;
    let away_turnoverMadeModal = false;
    let away_clearAttemptedModal = false;
    let away_penaltyModal = false;
    let away_faceoffModal = false;
    let away_subModal = false;
    let away_groundBallModal = false;
    let away_timeoutModal = false;

    let selectedShooter = ''; // Variable to store the selected player
    let selectedPlayer = ''; // Variable to store the selected player

      // Array of player names (Replace with lineup data)
    const home_players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
    const away_players = ['Player A', 'Player B', 'Player C'];

    let quarterLength = 15; // Default quarter length (in minutes)
    let currentTime = 0; // Current time (in seconds)
    let interval; // Interval for updating the clock

    // Function to start the game clock
    const startClock = () => {
        interval = setInterval(() => {
            currentTime++;
            if (currentTime >= quarterLength * 60) {
                // Game over, reset clock
                clearInterval(interval);
                currentTime = 0;
            }
        }, 1000);
    };

    onMount(() => {
        // Start the clock when the component mounts
        startClock();
    });

    onDestroy(() => {
        // Clean up interval when component is destroyed
        clearInterval(interval);
    });

    // Function to format seconds into MM:SS format
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to handle selection change
    const handleSelection = (event) => {
        selectedPlayer = event.target.value;
    };
</script>

<div>
    <!-- Display game clock -->
    <h2>{formatTime(currentTime)}</h2>

    <!-- Home Team container -->
    <div>
        <h1>Home Team</h1>
        <!--GUI Buttons to prompt modal for further input-->
        <button on:click={() => (home_shotModal = true)}>Shot</button>
        <button on:click={() => (home_turnoverMadeModal = true)}>Turnover Made</button>
        <button on:click={() => (home_clearAttemptedModal = true)}>Clear Attempted</button>
        <button on:click={() => (home_penaltyModal = true)}>Penalty</button>
        <button on:click={() => (home_faceoffModal = true)}>Faceoff</button>
        <button on:click={() => (home_subModal = true)}>Sub</button>
        <button on:click={() => (home_groundBallModal = true)}>Ground Ball</button>
        <button on:click={() => (home_timeoutModal = true)}>Timeout</button>
    </div>

    <!-- Away Team Container -->
    <div>
        <h1>Away Team</h1>
        <!--GUI Buttons to prompt modal for further input-->
        <button on:click={() => (away_shotModal = true)}>Shot</button>
        <button on:click={() => (away_turnoverMadeModal = true)}>Turnover Made</button>
        <button on:click={() => (away_clearAttemptedModal = true)}>Clear Attempted</button>
        <button on:click={() => (away_penaltyModal = true)}>Penalty</button>
        <button on:click={() => (away_faceoffModal = true)}>Faceoff</button>
        <button on:click={() => (away_subModal = true)}>Sub</button>
        <button on:click={() => (away_groundBallModal = true)}>Ground Ball</button>
        <button on:click={() => (away_timeoutModal = true)}>Timeout</button>
    </div>

    <!-- Modal for shot attempt -->
    <Modal bind:home_shotModal>
        <h1 slot="header">SHOT ATTEMPT</h1>
        <!-- Select element with options populated from the players array -->
        <label for="playerSelect">Shot by:</label>
        <select bind:value={selectedShooter} on:change={handleSelection}>
            <option value="">Select Player</option> <!-- Default option -->
            {#each home_players as player}
              <option value={player}>{player}</option> <!-- Option for each player -->
            {/each}
        </select>
        <hr />
        <button>Shot Made</button>
        <button>Shot Missed/Wide</button>
        <label for="awayPlayerSelect">Saved By:</label>
        <select bind:value={selectedPlayer} on:change={handleSelection}>
            <option value="">Select Savee</option> <!-- Default option -->
            {#each away_players as player}
              <option value={player}>{player}</option> <!-- Option for each player -->
            {/each}
        </select>
    </Modal>
</div>
