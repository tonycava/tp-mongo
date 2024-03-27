<script lang="ts">
	import InputField from '@components/common/InputField.svelte';
	import { INPUT } from '$lib/helpers/form.helper';
</script>

<InputField
  placeholder="example@exemple.com"
  title="Username"
  name={INPUT.USERNAME}
/>

<InputField
  placeholder="123456"
  title="Password"
  type="password"
  name={INPUT.PASSWORD}
/>