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
    <style>
        /* Color Palette */
        .base-color { background: #081820; color: #ffffff; }
        .dark-color { background: #393e46; }
        .light-color { background: #f96d00; }
        .fourth-color { background: #e0f8d0; }

        /* Basic styling */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #081820;
        }
        .container {
            max-width: 80% ;
            margin: 20px 10px;
            padding: 20px;
            background-color: #88c070;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: left;
            margin-bottom: 20px;
        }
        form {
            width: 800px;
        }
        .position-selector {
            display: flex;
            align-items: center; /* Align items vertically */
            margin-top: 16px;
            margin-bottom: 16px;
        }
        .position-circles {
            display: flex; /* Make circles container a flex container */
        }
        .position-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f2f2f2;
            color: #222831; /* Using the first color for text */
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: 10px; /* Add margin between circles */
            transition: background-color 0.3s ease;
        }
        .position-circle.active {
            background-color: #081820; /* Using the second color when active */
            color: #ffffff; /* White text color when active */
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
            padding: 8px;
            margin-bottom: 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        input[type="submit"] {
            padding: 10px 20px;
            background-color: #007bff; /* Blue color for the button */
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
        .error-message {
            color: red;
            margin-top: 5px;
            display: none;
        }

    </style>
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
        <div class="container">
            <h1>Add Player to {data.team.team_name} </h1>
            <form id="rosterForm" method="POST" action="?/addPlayer">
                <div>
                    <!-- Input fields -->
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                    
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>

                

                <div>
                <label for="major">Major:</label>
                <input type="text" id="major" name="major">

                <label for="clg_class">Classman (Fr., So., Jr., Sr., or Gr.):</label>
                <select bind:value={selectedClgClass} on:change={handleClgClassSelect}>
                    <option value="Fr.">Freshman</option>
                    <option value="So.">Sophomore</option>
                    <option value="Jr.">Junior</option>
                    <option value="Sr.">Senior</option>
                </select>

                
                </div>

                <!-- Position selector -->
                <div class="position-selector">
                    <div class="position-circles">
                        <label for="position">Position:</label>
                        <select bind:value={selectedPosition} on:change={handlePosSelection} required>
                            {#each positions as position}
                                <option value={position}>{position}</option>
                            {/each}
                        </select>
                    </div>

                    <label for="jerseyNumber">Jersey Number:</label>
                    <input type="number" id="jerseyNumber" name="jerseyNumber" min="0" max="99" required>

                    <label for="home_town">Home Town:</label>
                    <input type="text" id="home_town" name="home_town">
                </div>

                <!-- Hidden input for position -->
                <input type="hidden" id="position" name="position" value={selectedPosition} required>

                <input type="hidden" id="clg_class" name="clg_class" value={selectedClgClass} required>


                <!-- Hidden input for team_id-->
                <input type="hidden" id="team_id" name="team_id" required value={data.locals.coach.team_id}>
                <!-- Additional input fields -->
                <label for="height">Height (in inches):</label>
                <input type="number" id="height" name="height" min="0" max="100" step="1">

                <label for="weight">Weight (in lbs):</label>
                <input type="number" id="weight" name="weight" min="0" max="500" step="1">



                <!-- Submit button and error message -->
                <input type="submit" value="Add Player">
                <div class="error-message" id="position-error" style="display: none;">Please select a position</div>
            </form>
        </div>
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
</style>