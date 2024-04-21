<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;
    
    $: player = data.player;
    
    function goToRoster() {
      goto('/my-team/roster');
    }
  </script>
  
  <main>
    <h1>Edit Player</h1>
    {#if player}
      <form method="POST" action="?/update">
        <div class="edit-info" style="display: table;">
          <div class="edit-row" style="display: table-row;">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" value={player.first_name} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" value={player.last_name} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="pos">Position:</label>
            <input type="text" id="pos" name="pos" value={player.pos} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="height">Height:</label>
            <input type="number" id="height" name="height" step="0.01" value={player.height} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="weight">Weight:</label>
            <input type="number" id="weight" name="weight" step="0.01" value={player.weight} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="jersey_num">Jersey Number:</label>
            <input type="number" id="jersey_num" name="jersey_num" value={player.jersey_num} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="clg_class">College Class:</label>
            <input type="text" id="clg_class" name="clg_class" value={player.clg_class} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="major">Major:</label>
            <input type="text" id="major" name="major" value={player.major} />
          </div>
          <div class="edit-row" style="display: table-row;">
            <label for="home_town">Home Town:</label>
            <input type="text" id="home_town" name="home_town" value={player.home_town} />
          </div>
        </div>
        <div class="btnContainer">
          <div class="buttons">
            <button type="submit">Save Changes</button>
          </div>
        </div>
      </form>
      
      <form method="POST" action="?/delete">
        <div class="btnContainer">
          <div class="buttons">
            <button type="submit">Delete Player</button>
          </div>
        </div>
      </form>
      
      {#if form?.success}
        <p>Player updated successfully!</p>
        <button on:click={goToRoster}>Go to Roster</button>
      {:else if form?.error}
        <p>Error: {form.error}</p>
      {/if}
    {:else}
      <p>Loading player data...</p>
    {/if}
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

    .edit-info {
      margin-left: auto;
      margin-right: auto;
      font-size: 20px;
    }

    label {
      text-align: left;
    }

    input {
      margin-right: 0px;
      font-size: 20px;
      float: right;
      margin-left: 50px;
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

