<script lang="ts">
    import { getTeamStatsFromGame, getGame, getPlayersByTeamId } from '$lib/api';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import Table from '../../../table.svelte';
  
    let gameId = $page.params.gameId;
    let game: Game | undefined;
    let homeTeamStats: PlayerStats[] = [];
    let awayTeamStats: PlayerStats[] = [];
    let homePlayers: Player[] = [];
    let awayPlayers: Player[] = [];

    let hTeamStatsTable = [];
    let blueStyle = "blueTable";
  
    async function fetchData() {
      game = await getGame(gameId);
      if (game) {
        const homeTeamId = game.hometeam_id;
        const awayTeamId = game.awayteam_id;
        homeTeamStats = await getTeamStatsFromGame(homeTeamId, gameId);
        awayTeamStats = await getTeamStatsFromGame(awayTeamId, gameId);
        homePlayers = await getPlayersByTeamId(homeTeamId);
        awayPlayers = await getPlayersByTeamId(awayTeamId);
      }
      console.log(hTeamStatsTable);
      console.log(Object.keys(hTeamStatsTable[0]));
    }
  
    onMount(() => {
      fetchData();
    });
  </script>
  
  <main>
    <h1>Halftime Review</h1>
    <h2>Home Team Stats</h2>
    {#if homeTeamStats.length > 0}
      <div class="table-wrapper">
        <table class="stats-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Jersey #</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Shots</th>
              <th>Shots on Goal</th>
              <th>Ground Balls</th>
              <th>Turnovers</th>
              <th>Turnovers Caused</th>
              <th>Faceoffs Won</th>
              <th>Faceoffs Lost</th>
              <th>Saves</th>
              <th>Penalties</th>
              <th>Clears Attempted</th>
              <th>Clears Made</th>
              <th>Goals Allowed</th>
            </tr>
          </thead>
          <tbody>
            {#each homeTeamStats as stats}
              <tr>
                {#if homePlayers.length > 0}
                  {#each homePlayers as player}
                    {#if player.player_id === stats.player_id}
                      <td>{player.first_name}</td>
                      <td>{player.last_name}</td>
                      <td>{player.pos}</td>
                      <td>{player.jersey_num}</td>
                    {/if}
                  {/each}
                {/if}
                <td>{stats.goals}</td>
                <td>{stats.assists}</td>
                <td>{stats.shots}</td>
                <td>{stats.shots_on_goal}</td>
                <td>{stats.ground_balls}</td>
                <td>{stats.turnovers}</td>
                <td>{stats.turnovers_caused}</td>
                <td>{stats.faceoffs_won}</td>
                <td>{stats.faceoffs_lost}</td>
                <td>{stats.saves}</td>
                <td>{stats.penalties}</td>
                <td>{stats.clears_attempted}</td>
                <td>{stats.clears_made}</td>
                <td>{stats.goals_allowed}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>No stats available for the home team.</p>
    {/if}
  
    <h2>Away Team Stats</h2>
    {#if awayTeamStats.length > 0}
      <div class="table-wrapper">
        <table class="stats-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Jersey #</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Shots</th>
              <th>Shots on Goal</th>
              <th>Ground Balls</th>
              <th>Turnovers</th>
              <th>Turnovers Caused</th>
              <th>Faceoffs Won</th>
              <th>Faceoffs Lost</th>
              <th>Saves</th>
              <th>Penalties</th>
              <th>Clears Attempted</th>
              <th>Clears Made</th>
              <th>Goals Allowed</th>
            </tr>
          </thead>
          <tbody>
            {#each awayTeamStats as stats}
              <tr>
                {#if awayPlayers.length > 0}
                  {#each awayPlayers as player}
                    {#if player.player_id === stats.player_id}
                      <td>{player.first_name}</td>
                      <td>{player.last_name}</td>
                      <td>{player.pos}</td>
                      <td>{player.jersey_num}</td>
                    {/if}
                  {/each}
                {/if}
                <td>{stats.goals}</td>
                <td>{stats.assists}</td>
                <td>{stats.shots}</td>
                <td>{stats.shots_on_goal}</td>
                <td>{stats.ground_balls}</td>
                <td>{stats.turnovers}</td>
                <td>{stats.turnovers_caused}</td>
                <td>{stats.faceoffs_won}</td>
                <td>{stats.faceoffs_lost}</td>
                <td>{stats.saves}</td>
                <td>{stats.penalties}</td>
                <td>{stats.clears_attempted}</td>
                <td>{stats.clears_made}</td>
                <td>{stats.goals_allowed}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>No stats available for the away team.</p>
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

    h2 {
        font-size: 25px;
        text-align: center;
    }

    .table-wrapper {
		  max-height: 500px;
		  overflow-y: auto;
		  max-width: 100%;
	  }

    .stats-table {
      width: 100%;
      text-align: center;
		  border-collapse: collapse;
		  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
  
    .stats-table td {
      border-style: hidden!important;;
		  border: 0.5px solid #b1b1b1;
		  padding: 3px 2px;
    }

    .stats-table tbody td {
      font-size: 16px;
    }

    .stats-table tr:nth-child(even) {
		  background: #e0f8d0;
	  }

    .stats-table thead {
      background: #346856;
      border-bottom: 2px solid #346856;
      position: sticky;
      top: -1px;
      z-index: 9;
	  }

    .stats-table thead th {
      font-size: 16px;
      font-weight: bold;
      color: white;
      position: sticky;
      top: 0px;
      z-index: 9;
    }

    .stats-table thead th:first-child {
  		border-left: none;
	  }
  
    .stats-table tbody tr:hover {
      background-color: lightgrey;
    }
  </style>