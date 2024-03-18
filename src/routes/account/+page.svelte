<script lang='ts'>
    import type { PageServerData } from "./$types";
    import type { getUser } from "$lib/db"
    import Modal from './modal.svelte';
    export let data: PageServerData;

    let teamName = "none";
    //if (data.coach.team_id == null || data.coach.team_id == "") {
    //    teamName = "None";
    //}

    let editModal = false;
</script>

<main>
    <h1>Coach Account Information</h1>
    <table class="accountInfo">
        <tr>
            <td>Username:</td>
            <td>{data.user.user_name}</td>
        </tr>
        <tr>
            <td>Password</td>
            <td>{data.user.pword}</td>
        </tr>
        <tr>
            <td>First Name:</td>
            <td>{data.coach.first_name}</td>
        </tr>
        <tr>
            <td>Last Name:</td>            
            <td>{data.coach.last_name}</td>
        </tr>
        <tr>
            <td>Date of Birth:</td>
            <td>{data.coach.birth_date.toLocaleDateString()}</td>
        </tr>
        <tr>
            <td>Phone:</td>
            <td>{data.coach.phone}</td>    
        </tr>
        <tr>
            <td>Team:</td>
            <td>{teamName}</td>
        </tr>        
    </table>
    <form id="a" method="POST" action="?/logout">
        <button>Logout</button>
    </form>
    <button id="b" on:click={() => (editModal = true)}>Edit</button>
</main>

<Modal bind:editModal>
    <h1 slot="header">Please Edit Account Information</h1>
        <div class="edit-info" style="display: table;">
            <form method="POST" action="?/edit">
                <div class="edit-row" style="display: table-row;">
                    <label for=12 style="display: table-cell;">Username:</label>
                    <input name="uname" id=12 type="text">
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for=13 style="display: table-cell;">Password:</label>
                    <input name="pword" id=13 type="text">
                </div>
                <div class="edit-row" style="display: table-row;">
                    <label for=18 style="display: table-cell;">Phone Number:</label>
                    <input name="phone" id=18 type="text" value="###-###-####">
                </div>
                <div class="edit-row" style="display: table-row;">
                    <button style="display: table-cell;">Save Changes</button>
                </div>
            </form>
        </div>
</Modal>

<style>
    .accountInfo {
        font-size: 20px;
        width: 75%;
    }
</style>