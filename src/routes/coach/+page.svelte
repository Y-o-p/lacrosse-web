<script lang="ts">
    import { postTeamStats } from "$lib/api";
    let id = 0;

    async function newScorebook() {
        const stats: TeamStats = {
            id: 0n,
            teamId: 0n,
            gameId: 0n,
            goals: 0,
            assists: 0,
            shots: 0,
            timeouts: 0,
            field: ""
        };
        id = Number(await postTeamStats(stats, "coach"));
    }
</script>

<h1>Sup, Coach</h1>
<button on:click={newScorebook}>
    New Game
</button>
<p>
    Scorebook: {id}
</p>