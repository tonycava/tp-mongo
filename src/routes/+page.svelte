<script lang="ts">
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import PrimaryButton from '@components/common/PrimaryButton.svelte';

	export let data: PageServerData;
</script>


<div class="flex gap-6">
  <div>
    <h1>Your survey :</h1>
    {#each data.surveys as survey}
      <h1>{survey.title}</h1>
      <a href="/survey/{survey.id}/modify">Modify my
        survey</a>

      <form
        action="?/deleteSurvey"
        method="POST"
        enctype="multipart/form-data"
        use:enhance
      >
        <input
          type="hidden"
          name="surveyId"
          value={survey.id}
        >
        <button type="submit">Supprimer</button>
      </form>

    {/each}
  </div>

  <div>
    <h1>Other survey :</h1>
    {#each data.otherSurveys as survey}
      <h1>{survey.title}</h1>
      <a href="/survey/{survey.id}">Respond to this survey</a>
    {/each}

  </div>


</div>  <PrimaryButton className="p-4">
  <a href="/create-survey" class="">Create your own survey</a>
</PrimaryButton>