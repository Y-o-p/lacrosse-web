<script>
    import Modal from './modal.svelte';
    import { page } from "$app/stores";

    // Page Variables
    $: routeId = $page.route.id;
    let loginModal = false;
    let signupModal = false;
    
</script>

<html lang="en">
    <body>
        <div class="topAdSpace">Ad Space</div>
        <nav class="topnav">
            <a href="/" class:active={routeId == "/"}>Home</a>
            <a href="/games" class:active={routeId == "/games"}>Games</a>
            <a href="/teams" class:active={routeId == "/teams"}>Teams</a>
            <a href="/players" class:active={routeId == "/players"}>Players</a>
            <div class="dropdown">
                <button class="dropbtn">Coach
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="/my-team">My Team</a>
                    <a href="/my-team/player">My Players</a>
                    <a href="/my-team/roster">My Roster</a>
                    <a href="/scorebooks">Scorebooks</a>
                    <a href="/scorekeeper">Scorekeeper</a>
                </div>
            </div>
            <a href="/account" class:active={routeId == "/account"}>Account</a>
            
            <b on:click={() => (signupModal = true)}>Sign Up</b>
            <b on:click={() => (loginModal = true)}>Login</b>
        </nav>
        <div class="rightAdSpace">Ad Space</div>
        <div class="bottomAdSpace">Ad Space</div>

        <slot />

        <Modal bind:loginModal>
            <h1 slot="header">Please Enter Login Information</h1>
                <div class="login-info" style="display: table;">
                    <form method="POST" action="/?/login">
                        <div class="login-row" style="display: table-row;">
                            <label id="10" for=check style="display: table-cell;">Username:</label>
                            <input name="uname" type="text">
                        </div>
                        <div class="login-row" style="display: table-row;">
                            <label id="11" for=check style="display: table-cell;">Password:</label>
                            <input name="pword" type="text">
                        </div>
                        <div class="login-row" style="display: table-row;">
                            <button style="display: table-cell;">Login</button>
                        </div>
                    </form>
                </div>
        </Modal>

        <Modal bind:signupModal>
            <h1 slot="header">Please Enter Account Information</h1>
            <div class="sinup-info" style="display: table;">
                <form method="POST" action="/?/register">
                    <div class="signup-row" style="display: table-row;">
                        <label for=12 style="display: table-cell;">Username:</label>
                        <input name="uname" id=12 type="text">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <label for=13 style="display: table-cell;">Password:</label>
                        <input name="pword" id=13 type="text">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <label for=14 style="display: table-cell;">First Name:</label>
                        <input name="fName" id=14 type="text">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <label for=15 style="display: table-cell;">Last Name:</label>
                        <input name="lName" id=15 type="text">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <label for=17 style="display: table-cell;">Date of Birth:</label>
                        <input name="birthday" id=17 type="text" value="mm/dd/yyyy">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <label for=18 style="display: table-cell;">Phone Number:</label>
                        <input name="phone" id=18 type="text" value="xxx-xxx-xxxx">
                    </div>
                    <div class="signup-row" style="display: table-row;">
                        <button style="display: table-cell;">Sign Up</button>
                    </div>
                </form>
            </div>
        </Modal>
    </body>
</html>

<style>
    html {
        width: auto;
        height: auto;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    
    body {
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 0px;
        margin-right: 0px;
    }

    .topAdSpace {
        width: 100%;
        height: 80px;
        background: orange;
        text-align: center;
        position: fixed;
        top: 0;
        z-index: 99999;
    }

    .rightAdSpace {
        width: 100px;
        height: 100%;
        position: fixed;
        top: 128px;
        right: 0px;
        background: orange;
        text-align: center;
        z-index: 99999;
    }

    .bottomAdSpace {
        width: 100%;
        height: 80px;
        position: fixed;
        bottom: 0px;
        background: orange;
        text-align: center;
        z-index: 99999;
    }


    /* Add a black background color to the top navigation */
    .topnav {
        background-color: #333;
        overflow: hidden;
        width: 100%;
        position: fixed;
        top: 80px;
        z-index: 99999;
    }

    /* Style the links inside the navigation bar */
    .topnav a {
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        z-index: 99999;
    }

    .topnav b {
        float: right;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        z-index: 99999;
    }

    /* Change the color of links on hover */
    .topnav a:hover, .dropdown:hover .dropbtn {
        background-color: #ddd;
        color: black;
        z-index: 99999;
    }

    .topnav b:hover {
        background-color: #ddd;
        color: black;
        z-index: 99999;
    }

    /* Add a color to the active/current link */
    .topnav a.active {
        background-color: #2c2fe2;
        color: white;
        z-index: 99999;
    }

    .topnav b.active {
        background-color: #2c2fe2;
        color: white;
        z-index: 99999;
    }

    .dropdown {
        float: left;
        overflow: hidden;
        z-index: 99999;
    }

    .dropdown .dropbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
        z-index: 99999;
    }

    .dropdown-content {
        display: none;
        position: fixed;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 99999;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
        z-index: 99999;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
        z-index: 99999;
    }

    .dropdown:hover .dropdown-content {
        display: block;
        z-index: 99999;
    }
</style>