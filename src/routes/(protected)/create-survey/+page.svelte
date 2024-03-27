<script lang="ts">
	import { enhance } from '$app/forms';
	import { Options } from '$lib';

	type Question = {
		value: string;
		count: number;
	};

	let questionCount = 1;
	let types: Question[] = [{ value: 'text', count: 1 }];

	$: {
		types = Array(questionCount).fill(null).map((_, i) => types[i] || {
			value: 'text',
			count: 1
		});
	}

	const addQuestion = () => {
		questionCount += 1;
	};
</script>

<form
  use:enhance
  action="?/create"
  method="POST"
  class="flex flex-col"
  enctype="multipart/form-data"
>
  <label for="survey-name">My survey name : </label>
  <input id="survey-name" name="title" type="text">

  {#each Array(questionCount) as _, i}
    {@const input = types[i]}

    <input
      type="text"
      name="question{i}"
      class="form-control"
      placeholder="Question"
      required
    />

    <select
      name="question-type{i}"
      class="form-control"
      bind:value={types[i].value}
      required
    >
      {#each Object.values(Options) as option, j}
        <option value={option}>{option}</option>
      {/each}
    </select>

    {#if input.value === Options.MULTIPLE_CHOICE}
      {#each Array(input.count) as _}
        <input
          type="text"
          name="option{i}"
          class="form-control"
          placeholder="Type option"
          required
        />
      {/each}

      <button
        on:click={() => types[i].count += 1}
        class="bg-zinc-500"
      >
        Add Option
      </button>
    {/if}
  {/each}

  <button type="submit" class="btn btn-primary">
    Submit
  </button>
</form>

<button on:click={addQuestion}>Add Question</button>