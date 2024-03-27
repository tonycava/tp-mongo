<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { capitalize } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import Loading from '@components/common/Loading.svelte';
	import PrimaryButton from '@components/common/PrimaryButton.svelte';

	let isLoading = false;
	export let data: LayoutServerData;
	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};

</script>

{#if isLoading}
  <Loading absolute />
{/if}

<div class="flex justify-center items-center h-screen flex-col gap-6">
  <span class="text-3xl text-center font-poppins-bold">Climatix</span>
  <div class="p-8 rounded-lg w-11/12 sm:w-auto shadow-lg">
    <form
      action={`?/${data.title}`}
      method="POST"
      use:enhance={handleSubmit}
      class="flex-col flex relative"
    >
      <slot />
      <span class="text-red-600 font-poppins-bold bottom-[50px]">
        {#if $page.form?.internalError}
          <strong>{$page.form.internalError}</strong>
        {:else}
          <strong>&nbsp;</strong>
        {/if}
      </span>
      <PrimaryButton
        type="submit"
        className="w-[95%] mx-auto mt-2 font-bold"
      >
        {capitalize(data.title)}
      </PrimaryButton>
    </form>
  </div>
  {#if (data.title === "register")}
  <span class="flex gap-2">Have an account ?
    <a
      class="text-primary font-poppins-bold font-bold"
      href="/login"
    >
      Login now !
    </a>
  </span>
  {/if}
  {#if (data.title === "login")}
  <span class="flex gap-2">Don't have an account ?
    <a
      class="text-primary font-poppins-bold font-bold"
      href="/register"
    >
      Register now !
    </a>
  </span>
  {/if}

</div>