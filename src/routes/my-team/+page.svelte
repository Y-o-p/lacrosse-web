<script lang="ts">
    import type { PageServerData } from "./$types";
	export let data: PageServerData;
</script>

<h1>Hello, {data.coach.first_name} {data.coach.last_name}</h1>
