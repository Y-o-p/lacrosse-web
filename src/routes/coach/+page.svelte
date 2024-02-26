<script lang="ts">
    import { postScorebookSession, postTeamStats } from "$lib/api";
    let id = 0;
    let room_code = "Unknown";
    import type { PageServerData } from "./$types";
	export let data: PageServerData;
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
        id = Number(await postTeamStats(stats));
    }

    async function newSession() {
        const session: any = {
            coachId: data.id
        };
        room_code = await postScorebookSession(session);
    }

</script>

<h1>Hello, {data.coach.first_name} {data.coach.last_name}</h1>
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
    Editing Session: {room_code}
</p>
