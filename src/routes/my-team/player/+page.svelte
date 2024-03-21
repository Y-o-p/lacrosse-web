<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
    import Modal from './addPlayerModal.svelte';
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
            margin: 15px 10px;
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
    {#if data.coach.team_id == null}

        <!-- Modal Dialogue for New Team Creation -->
        <Modal>
            <form id="addTeamForm" method="POST" action="?/createTeam">
                <label for="teamName">Team Name:</label>
                <input type="text" id="teamName" name="teamName" required>
                <input type="submit" value="Create Team">
                <input type="hidden" id="team_id" name="team_id" required value={null}>
                <input type="hidden" id="coach_id" name="coach_id" required value={data.coach.coach_id}>
            </form>
        </Modal>
        
    {:else}
        <div class="container">
            <h1>Coach, {data.coach.first_name}, Roster Input </h1>
            <form id="rosterForm" method="POST" action="?/addPlayer">
                <!-- Input fields -->
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
                
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required>

                <!-- Position selector -->
                <div class="position-selector">
                    <label for="position">Position:</label>
                    <div class="position-circles">
                        <div class="position-circle" data-position="GK">GK</div>
                        <div class="position-circle" data-position="MF">MF</div>
                        <div class="position-circle" data-position="A">A</div>
                        <div class="position-circle" data-position="D">D</div>
                    </div>
                </div>

                <!-- Hidden input for position -->
                <input type="hidden" id="position" name="position" required>

                <!-- Hidden input for team_id-->
                <input type="hidden" id="team_id" name="team_id" required value={data.coach.team_id}>
                <!-- Additional input fields -->
                <label for="height">Height (in inches):</label>
                <input type="number" id="height" name="height" min="0" max="100" step="1" required>

                <label for="weight">Weight (in lbs):</label>
                <input type="number" id="weight" name="weight" min="0" max="500" step="1" required>

                <label for="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" required>

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

        // Add event listener to position circles
        const positionCircles = document.querySelectorAll(".position-circle");

        // Add click event listener to each position circle
        positionCircles.forEach(circle => {
            circle.addEventListener("click", function() {
                // Toggle active class
                this.classList.toggle("active");
                
                // Set the selected position in the hidden input field
                document.getElementById("position").value = this.dataset.position;
            });
        });
    </script>
</body>
</html>
