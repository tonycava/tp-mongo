<script lang="ts">
	import type { PageServerData } from './$types';
	import { convertIndexToOrdinal, capitalize, Options } from '$lib';
	import { applyAction, enhance } from '$app/forms';
	import PrimaryButton from '@components/common/PrimaryButton.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	export let form: any;

	let isLoading = true;
	$: isLoading = !data;

	$: if (form?.status === 200) {
		setTimeout(() => {
			goto('/');
		}, 4000);
	}
	const onSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};
</script>

{#if isLoading}
  Loading...
{/if}

{data.survey.title}<br>

<span class="text-red-600 font-poppins-bold bottom-[50px]">
   <strong>{form?.message ?? ""}</strong>
</span>

<form
  use:enhance={onSubmit}
  enctype="multipart/form-data"
  method="POST"
  action="?/respondToSurvey"
>
  {#each data.survey.questions as question, i}
    <h1>{capitalize(convertIndexToOrdinal(i))} question
      :</h1>

    {#if Options.TEXT === question.type}
    <textarea
      placeholder="Place your response here"
      class="resize-none"
      name={question.id}
    ></textarea>
    {/if}

    {#if Options.MULTIPLE_CHOICE === question.type}
      <select name={question.id}>
        <option selected hidden value="">Select an option
        </option>
        {#each question.answers as answer}
          <option
            value={answer}
          >
            {answer}
          </option>
        {/each}
      </select>
    {/if}

  {/each}

  <PrimaryButton className="p-4" type="submit">
    Submit
  </PrimaryButton>
</form>