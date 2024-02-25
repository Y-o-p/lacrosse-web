<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coach Roster Input</title>
    <style>
        /* Basic styling */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fdf;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .position-selector {
            display: flex;
            justify-content: space-between;
            width: 240px;
            margin-bottom: 16px;
        }
        .position-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #007bff;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .position-circle.active {
            background-color: #0056b3;
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
            background-color: #007bff;
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
    <div class="container">
        <h1>Coach Roster Input</h1>
        <form id="rosterForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required>
            
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required>

            <div class="position-selector">
                <div class="position-circle" data-position="GK">GK</div>
                <div style="width: 10px;"></div>
                <div class="position-circle" data-position="MF">MF</div>
                <div style="width: 10px;"></div>
                <div class="position-circle" data-position="A">A</div>
                <div style="width: 10px;"></div>
                <div class="position-circle" data-position="D">D</div>
            </div>
            <input type="hidden" id="position" name="position" required>

            <label for="height">Height (in inches):</label>
            <input type="number" id="height" name="height" min="0" max="100" step="1" required>

            <label for="weight">Weight (in lbs):</label>
            <input type="number" id="weight" name="weight" min="0" max="500" step="1" required>

            <label for="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate" required>

            <input type="submit" value="Add Player">
            <div class="error-message" id="position-error">Please select a position</div>
        </form>
    </div>

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

            // Get form data if the form is valid
            if (event.defaultPrevented === false) {
                const formData = new FormData(event.target);
                const playerData = {};
                formData.forEach((value, key) => {
                    playerData[key] = value;
                });

                // Log player data (you can replace this with sending data to your server)
                console.log("Player data:", playerData);

                // Clear form fields
                event.target.reset();
            }
        });

        // Add event listener to position circles
        const positionCircles = document.querySelectorAll(".position-circle");
        positionCircles.forEach(circle => {
            circle.addEventListener("click", function() {
                // Remove active class from all circles
                positionCircles.forEach(circle => {
                    circle.classList.remove("active");
                });

                // Add active class to the clicked circle
                this.classList.add("active");

                // Set the selected position in the hidden input field
                document.getElementById("position").value = this.dataset.position;
            });
        });
    </script>
</body>
</html>
