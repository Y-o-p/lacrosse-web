<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
    import Modal from './addPlayerModal.svelte';

    const positions = ['G', 'M', 'A', 'D', 'L'];
    let selectedPosition = '';
    let selectedClgClass = '';

    const handlePosSelection = (event) => {
        selectedPosition = event.target.value;
    };

    const handleClgClassSelect = (event) => {
        selectedClgClass = event.target.value;
    }
</script>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coach Roster Input</title>
</head>

<body>
    {#if data.locals.coach.team_id == null}

        <!-- Modal Dialogue for New Team Creation -->
        <Modal>
            <form id="addTeamForm" method="POST" action="?/createTeam">
                <label for="teamName">Team Name:</label>
                <input type="text" id="teamName" name="teamName" required>
                <input type="submit" value="Create Team">
                <input type="hidden" id="team_id" name="team_id" required value={null}>
                <input type="hidden" id="coach_id" name="coach_id" required value={data.locals.coach.coach_id}>
            </form>
        </Modal>
        
    {:else}
        <h1>Add Player to {data.team.team_name} </h1>
        <form id="rosterForm" method="POST" action="?/addPlayer">
            <div class="edit-info" style="display: table;">
                <div class="edit-row" style="display: table-row;">
                    <!-- Input fields -->
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for="major">Major:</label>
                    <input type="text" id="major" name="major">
                </div>
                <div class="edit-row" style="display: table-row;">
                <label for="clg_class">Class:</label>
                    <select bind:value={selectedClgClass} on:change={handleClgClassSelect}>
                        <option value="Fr.">Freshman</option>
                        <option value="So.">Sophomore</option>
                        <option value="Jr.">Junior</option>
                        <option value="Sr.">Senior</option>
                        <option value="Sr.">Graduate</option>
                    </select>
                </div>
                <!-- Position selector -->
                <div class="edit-row" style="display: table-row;">
                    <label for="position">Position:</label>
                    <select bind:value={selectedPosition} on:change={handlePosSelection} required>
                        {#each positions as position}
                            <option value={position}>{position}</option>
                        {/each}
                    </select>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for="jerseyNumber">Jersey Number:</label>
                    <input type="number" id="jerseyNumber" name="jerseyNumber" min="0" max="99" required>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for="home_town">Home Town:</label>
                    <input type="text" id="home_town" name="home_town">
                </div>
                <div class="edit-row" style="display: table-row;">
                    <!-- Hidden input for position -->
                    <input type="hidden" id="position" name="position" value={selectedPosition} required>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <input type="hidden" id="clg_class" name="clg_class" value={selectedClgClass} required>
                </div>
                <div class="edit-row" style="display: table-row;">
                    <!-- Hidden input for team_id-->
                    <input type="hidden" id="team_id" name="team_id" required value={data.locals.coach.team_id}>
                </div>
                <div class="edit-row" style="display: table-row;">
                <!-- Additional input fields -->
                    <label for="height">Height (in inches):</label>
                    <input type="number" id="height" name="height" min="0" max="100" step="1">
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for="weight">Weight (in lbs):</label>
                    <input type="number" id="weight" name="weight" min="0" max="500" step="1">
                </div>
            </div>
            <div class="btnContainer">
                <div class="buttons">
                    <button type="submit">Add Player</button>
                </div>
            </div>
            <div class="error-message" id="position-error" style="display: none;">Please select a position</div>
        </form>
    {/if}

    <!-- JavaScript code to handle form submission -->
    <script>
        document.getElementById("rosterForm").addEventListener("submit", function(event) {
            // Validate position selection
            const selectedPosition = document.getElementById("position").value;
            if (!selectedPosition) {
                event.preventDefault(); // Prevent form submission
                document.getElementById("position-error").style.display = "block";
            }
            else {
                document.getElementById("position-error").style.display = "none";
            }
        });
    </script>
</body>
</html>

<style>
    html {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 10px;
        margin-right: 110px;
    }

    h1 {
      box-sizing: border-box;
      background-color: #081820;
      color: white;
      font-size: 50px;
      text-align: center;
    }

    .edit-info {
      margin-left: auto;
      margin-right: auto;
      font-size: 20px;
    }

    label {
      text-align: left;
    }

    input, select {
      margin-right: 0px;
      font-size: 20px;
      float: right;
      margin-left: 50px;
      width: 200px;
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
      font-size: 30px;
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
    }
</style>