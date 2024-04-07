<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data: PageServerData;

</script>

<main>
    Hello
    <div>
        {data.homeTeamStats[0].Player}
        {data.homeTeamStats[0].Goals}
        {data.homeTeamStats[0].Assists}
        {data.homeTeamStats[0].Shots}
        



    </div>
</main>