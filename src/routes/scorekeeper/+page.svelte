<main>
    <h1>Hello Scorebook Keeper</h1>
    <h2>Please enter your scorebook code to edit the scorebook</h2>
    <form method="POST">
        <div class="field">
            <label>
                Scorebook Code:
                <input name="code" type="code">
            </label>
            <button type="submit">Edit</button>
        </div>
    </form>
</main>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 15px;
        margin-right: 115px;
		
    }

	h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    h2 {
        color: #346856;
        text-align: center;
    }

    .field {
        text-align: center;
        font-size: 18px;
    }

    input {
        font-size: 18px;
        text-transform: none;
    }

    button {
        font-size: 20px;
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