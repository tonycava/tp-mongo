<script lang="ts">
	export let type: "submit" | "button" | "reset" = "submit";
	export let className = "";
</script>

<button on:click {type} class="bg-primary text-white font-poppins-bold py-2 rounded {className}">
  <slot />
</button>