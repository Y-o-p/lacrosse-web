<script lang="ts">
    import type { PageServerData } from "./$types";
	export let data: PageServerData;
</script>

<main>
    <h1>Hello, {data.coach.first_name} {data.coach.last_name}</h1>
</main>

<style>
    main {
        margin-top: 130px;
        margin-bottom: 100px;
        margin-left: 10px;
        margin-right: 110px;
    }
</style>
