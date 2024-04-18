<script lang='ts'>
    import type { PageServerData } from "./$types";
    import type { getUser } from "$lib/db"
    import Modal from './modal.svelte';
    export let data: PageServerData;

    let editModal = false;
    
    function checkEmpty(element) {
        let ret = element;
        if (element == null || element == "") {
            ret = "";
        }
        return ret;
    }
</script>

<main>
    <h1>Coach Account Information</h1>
    <table>
        <tr>
            <td class="left">Username:</td>
            <td class="right">{checkEmpty(data.user.user_name)}</td>
        </tr>
        <tr>
            <td class="left">Password</td>
            <td class="right">{checkEmpty(data.user.pword)}</td>
        </tr>
        <tr>
            <td class="left">First Name:</td>
            <td class="right">{checkEmpty(data.coach.first_name)}</td>
        </tr>
        <tr>
            <td class="left">Last Name:</td>            
            <td class="right">{checkEmpty(data.coach.last_name)}</td>
        </tr>
        <tr>
            <td class="left">Email:</td>
            <td class="right">{checkEmpty(data.coach.email)}</td>
        </tr>
        <tr>
            <td class="left">Phone:</td>
            <td class="right">{checkEmpty(data.coach.phone)}</td>    
        </tr>
        <tr>
            <td class="left">Team:</td>
            <td class="right">{checkEmpty(data.team.team_name)}</td>
        </tr>        
    </table>
    <div class="btnContainer">
        <div class="button1">
            <form id="a" method="POST" action="?/logout">
                <button>Logout</button>
            </form>
        </div>
    </div>
    <div class="btnContainer">
        <div class="button2">
            <button id="b" on:click={() => (editModal = true)}>Edit</button>
        </div>
    </div>

</main>

<Modal bind:editModal>
    <h1 class="mHeader" slot="header">Please Edit Account Information</h1>
    <form method="POST" action="?/edit">
        <div class="edit-info" style="display: table;">
        
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
                <label for=13 style="display: table-cell;">Email:</label>
                <input name="email" id=14 type="text">
            </div>
            
        </div>
        <div class="btnContainer">
            <div class="buttons">
                <button style="display: table-cell;">Save Changes</button>
            </div>
        </div>
    </form>
</Modal>

<style>
    main {
        margin-top: 135px;
        margin-bottom: 100px;
        margin-left: 15px;
        margin-right: 115px;
    }

    h1.mHeader {
        margin-top: 0;
        padding-left: 10px;
        padding-right: 10px;
    }

    h1 {
        box-sizing: border-box;
        background-color: #081820;
        color: white;
        font-size: 50px;
        text-align: center;
    }

    td.left, label {
        padding: 3px;
        text-align: left;
    }

    td.right {
        padding-left: 200px;
        text-align: right;
    }

    input {
        margin-left: 150px;
        font-size: 20px;
    }
         
    table, .edit-info {
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
    }

    .btnContainer {
        padding-top: 10px;
        height: 75px;
        position: relative;
    }

    .button1, .buttons {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .button2 {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        padding-right: 1%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    button {
        font-size: 30px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        text-shadow: 1px 1px 0 #000, 2px 2px 0 #000;
        font-style: italic;
        color: white;
        background-color: #88c070;
        border: none;
        transform: skew(-12deg);
        padding-right:12px;
        box-shadow: 2px 2px 0 #081820;
    }

    button:hover {
        background-color: #346856;
        cursor: pointer;
    }
</style>