<script lang="ts">
    import { postScorebookSession, postTeamStats } from "$lib/api";
    let id = 0;
    let temp_id = 0;

    async function newScorebook() {
        const stats: TeamStats = {
            id: null,
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

    async function newSession() {
        const session: ScorebookSession = {
            id: null,
            gameId: 69n,
            expirationTime: BigInt(Math.floor(Date.now() / 1000) + 60 * 60),
        };
        temp_id = Number(await postScorebookSession(session, "coach"))
    }
</script>

<h1>Sup, Coach</h1>
<button on:click={newScorebook}>
    New Game
</button>
<p>
    Scorebook: {id}
</p>
<button on:click={newSession}>
    New Editing Session
</button>
<p>
    Editing Session: {temp_id}
</p>
