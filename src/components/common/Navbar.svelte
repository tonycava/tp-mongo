<script lang="ts">
	import { user } from '@stores/user.store';
	import Svg from '@components/common/Svg.svelte';
	import Cookie from 'js-cookie';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import { goto } from '$app/navigation';

	const onLogout = () => {
		Cookie.remove(COOKEYS.JWT_TOKEN);
		user.set(null);
		goto('/login');
	};
</script>

<div class="p-4 flex justify-between w-full items-center border-b-2 border-b-primary">
  <p class="font-poppins-bold text-lg">{$user?.username}</p>
  <div on:click={onLogout} class="rotate-180 cursor-pointer">
    <Svg size={6} src="/icons/Logout.svg" />
  </div>
</div>