<script lang="ts">
	export let title: string;
	export let value = '';

	export let type: "text" | "password" = "text"
	export let name = '';
	export let placeholder = '';

	const typeAction = (node: any) => {
		node.type = type
		return {
		}
	}
</script>

<fieldset class="flex gap-1 flex-col">
  <p class="font-poppins-regular mt-2">{title}</p>
  <input
    use:typeAction
    {name}
    {placeholder}
    class="p-2 border-secondary border-2 rounded text-secondary w-full"
    bind:value
  />
</fieldset>