<script lang="ts">
	import { INPUT } from '$lib/helpers/form.helper';
	import InputField from '@components/common/InputField.svelte';
</script>

<InputField
  placeholder="example@exemple.com"
  title="Username"
  name={INPUT.USERNAME}
/>
<InputField
  placeholder="example"
  title="Password"
  type="password"
  name={INPUT.PASSWORD}
/>

<InputField
  placeholder="example"
  title="Mot de passe de confirmation"
  type="password"
  name={INPUT.VERIFY_PASSWORD}
/>