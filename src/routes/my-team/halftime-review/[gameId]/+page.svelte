<script lang="ts">
    import { getTeamStatsFromGame, getGame, getPlayersByTeamId } from '$lib/api';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
  
    let gameId = $page.params.gameId;
    let game: Game | undefined;
    let homeTeamStats: PlayerStats[] = [];
    let awayTeamStats: PlayerStats[] = [];
    let homePlayers: Player[] = [];
    let awayPlayers: Player[] = [];
  
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
    }
  
    onMount(() => {
      fetchData();
    });
  </script>
  
  <main>
    <h1>Halftime Review</h1>
  
    <h2>Home Team Stats</h2>
    {#if homeTeamStats.length > 0}
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
    {:else}
      <p>No stats available for the home team.</p>
    {/if}
  
    <h2>Away Team Stats</h2>
    {#if awayTeamStats.length > 0}
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
    {:else}
      <p>No stats available for the away team.</p>
    {/if}
  </main>
  
  <style>
    .stats-table {
      width: 100%;
      border-collapse: collapse;
      font-family: Arial, sans-serif;
    }
  
    .stats-table th,
    .stats-table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
    .stats-table th {
      background-color: #f2f2f2;
    }
  
    .stats-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    .stats-table tr:hover {
      background-color: #e9e9e9;
    }
  </style>