<script>
    import Modal from './modal.svelte';
    import Radio from './radio.svelte';

    // Page Variables
    let loginModal = false;
    let signupModal = false;

    //export let role = '';

    function saveRole() {
        
    }

    // Role Options
    const options = [{
        value: 'webmaster',
        label: 'Webmaster',
    }, {
        value: 'coach',
        label: 'Coach',
    }, {
        value: 'scorebookkeeper',
        label: 'Scorebook keeper',
    }];
</script>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/my-team/player">Add Player</a>
<hr />
<a href="/my-team">My Team</a>

<main>
    <h1>Locrosse E-Scorebook</h1>
    <div class="button-container">
        <button on:click={() => (loginModal = true)}>Login</button>
        <button on:click={() => (signupModal = true)}>Sign Up</button>

    </div>
</main>

<Modal bind:loginModal>
    <h1 slot="header">Please Enter Login Information</h1>
        <div class="login-info" style="display: table;">
            <form method="POST" action="?/login">
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
        <form method="POST" action="?/register">
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
                    <button on:click={() => saveRole()} style="display: table-cell;">Sign Up</button>
            </div>
        </form>
    </div>
</Modal>
