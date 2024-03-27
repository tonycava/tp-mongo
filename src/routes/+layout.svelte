<script lang="ts">
	import '@styles/app.css';
	import Navbar from '@components/common/Navbar.svelte';
	import { page } from '$app/stores';
	import { user } from '@stores/user.store';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	const hideNavbar = [
		'/login',
		'/register'
	];


	$: needToShowNavbar = hideNavbar.includes($page.url.pathname);
	$: user.set(data.user);
</script>

{#if !needToShowNavbar}
  <Navbar />
{/if}

<slot />