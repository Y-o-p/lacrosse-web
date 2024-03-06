<script lang="ts">
    import { postScorebookSession, postTeamStats } from "$lib/api";
    import { goto } from '$app/navigation'; //Navigate to ./live-stats
    let id = 0;
    let room_code = "Unknown";
    import type { PageServerData } from "./$types";
	export let data: PageServerData;
    async function newScorebook() {
        // Navigate to live-stats page
        await goto('/my-team/live-stats');
        const stats: TeamStats = {
            game_id: 0n,
            team_id: 0n,
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
            coach_id: data.id
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
