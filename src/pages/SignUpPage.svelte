<script>
  import axios from 'axios';
  let disabled = true;
  let username, email, password, passwordRepeat;

  //svelte reactive declaration
  $: disabled = (password && passwordRepeat) ? password !== passwordRepeat : true;
  
  const handleSubmit = () => {
    axios.post('/api/1.0/users',{
      username, 
      email,
      password
    })
  }
</script>

<h1>Sign Up</h1>
<div>
  <label for='username'>Username</label>
  <input type='text' id='username' bind:value={username}/>

  <label for='email'>Email</label>
  <input type='text' id='email' bind:value={email}/>

  <label for='password'>Password</label>
  <input type='password' id='password' bind:value={password}/>

  <label for='password-repeat'>Password Repeat</label>
  <input type='password' id='password-repeat' bind:value={passwordRepeat}/>

  <button {disabled} on:click={handleSubmit}>Sign Up</button>
</div>


<style>

</style>
