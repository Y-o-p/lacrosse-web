<script lang="ts">
    import { getCoach } from "$lib/api";

    //import { getCoach } from "$lib/db";
    // let coach: Coach = {
    //     ID: 0n,
    //     teamID: 0n,
    //     lastName: "",
    //     firstName: "",
    //     birthdate: undefined,
    //     createdDate: undefined
    // };
    let firstName = "Unknown";

    async function test() {
        getCoach(2)
        .then((coach) => {
            firstName = coach.firstName;
        })
        .catch((err) => {
            console.log(err);
        })
    }
</script>

<h1>Welcome, {firstName} to SvelteKit</h1>
<button on:click={test}>
    Click Here
</button>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>