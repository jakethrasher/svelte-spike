<script>
  let disabled = true;
  let password, passwordRepeat;

  //svelte reactive declaration
  $: disabled = (password && passwordRepeat) ? password !== passwordRepeat : true;
</script>

<h1>Sign Up</h1>
<div>
  <label for='username'>Username</label>
  <input type='text' id='username'/>

  <label for='email'>Email</label>
  <input type='text' id='email'/>

  <label for='password'>Password</label>
  <input type='password' id='password' bind:value={password}/>

  <label for='password-repeat'>Password Repeat</label>
  <input type='password' id='password-repeat' bind:value={passwordRepeat}/>

  <button { disabled }>Sign Up</button>
</div>


<style>

</style>
