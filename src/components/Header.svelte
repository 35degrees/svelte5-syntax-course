<script>
	import { createState } from '../routes/state.svelte';
	import { ScottState } from '../routes/state.svelte';
	let { name, color } = $props();
	// let { name, children, secondChild } = $props();
	let boy = 'Tommy';

	const myState = createState();
	const scottState = new ScottState();
</script>

<h1 class="text-3xl" style="color: {color}">Hi From Header</h1>
{#if name}
	<p class="font-main flex flex-row gap-1 text-lg text-slate-400 font-light tracking-wider">
		Heyo from Agdasima, {name}!
	</p>

	<!-- onclick={myState.up} -->
	<button
		onclick={myState.up}
		class="mt-4 text-center ml-9 bg-blue-400 rounded-lg text-white py-1 px-5 border-none shadow-xl"
		>{myState.value}</button
	>
	<button
		onclick={() => scottState.up()}
		class="mt-4 text-center ml-9 bg-blue-400 rounded-lg text-white py-1 px-5 border-none shadow-xl"
		>{scottState.value}</button
	>
	<!-- <h3 class="text-blue-300 text-3xl font-bold italic">{@render secondChild(boy)}</h3> -->
{/if}
