==<script>
    export let data;
    $: ({ players } = data);
    
    import { goto } from '$app/navigation';
    
    function editPlayer(playerId) {
      goto(`/my-team/player/${playerId}/`);
    }
  </script>
  
  <main>
    <h1>Roster</h1>
    <div class="btnContainer">
      <div class="buttons">
        <button on:click={ () => { goto(`/my-team/player`) }}>Add Player</button>
      </div>
    </div>
    {#if players.length > 0}
      <div class="rosterContainer">
        {#each players as { player_id, first_name, last_name }}
          <div class="roster">
            <div class="rosterName">
              <div class="rosterText">
                {first_name} {last_name}
              </div>
              <!-- Button to navigate to the edit page for a player -->
            </div>
            <div class="rosterBtnContainer">
              <div class="rosterButtons">
                <button on:click={() => editPlayer(player_id)}>Edit</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p>No players found.</p>
    {/if}
  </main>

  <style>
    main {
        margin-top: 115px;
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

    .rosterContainer {
      margin-left: 28%;
    }

    .roster {
      height: 35px;
      width: 75%;
      margin-top: 15px;
      margin-left: 1%;
      margin-bottom: 15px;
    }

    .rosterName {
      background-color: #88c070;
      background-position: center;
      color: white;
      text-align: center;
      height: inherit;
      line-height: 35px;
      width: 50%;
      transform: skew(-12deg);
    }

    .rosterBtnContainer {
      background-color: #081820;
      background-position: center;
      color: white;
      text-align: center;
      height: inherit;
      line-height: 35px;
      width: 25%;
      transform: skew(-12deg);
    }

    .rosterName, .rosterBtnContainer {
      display: inline-block;
      font-size: 20px;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
    }

    .rosterText, .rosterButtons {
      transform: skew(12deg);
      font-kerning: normal;
      font-weight: 1;
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