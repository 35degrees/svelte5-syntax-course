<script>
	import { fly } from 'svelte/transition';
	import Header from '../components/Header.svelte';

	let formState = $state({
		answers: {},
		step: 0,
		error: ''
	});

	$inspect(formState.step);

	const QUESTIONS = [
		{
			question: 'What is your name?',
			id: 'name',
			type: 'text'
		},
		{
			question: 'What is your birthday?',
			id: 'birthday',
			type: 'date'
		},
		{
			question: 'What is your favorite color?',
			id: 'color',
			type: 'color'
		}
	];

	function nextStep(id) {
		if (formState.answers[id]) {
			formState.step += 1;
			formState.error = '';
		} else {
			formState.error = 'please fill out the form';
		}
	}

	$effect(() => {
		console.log('on mounted');
		return () => {
			// when unmounted or destroyed
			// before effect re-runs
			console.log('on unmounted');
		};
	});

	$effect(() => {
		// this runs whn formState.step changes
		// console.log('formState', formState.step);

		// DONT CREATE STATE BASED OFF OTHER STATE IN $effect, USE DERIVED
		return () => {
			// will run before the effect re-runs
			// console.log('before the formState effect re-runs', formState.step);
		};
	});
</script>

<Header name={formState.answers.name} color={formState.answers.color} />
<!-- <p>Hello Yo</p>
	{#snippet secondChild(name)}
		<p>Second child, {name}, is a baboon</p>
	{/snippet} -->
<!-- </Header> -->

<main class="flex flex-col gap-4 justify-center items-center mx-auto mt-10">
	{#if formState.step >= QUESTIONS.length}
		<p class="text-4xl tracking-wide font-main" style="color: {formState.answers.color}">
			Thank you!
		</p>
	{:else}
		<p class="text-4xl tracking-wide font-main">Step {formState.step + 1}</p>
	{/if}

	{#each QUESTIONS as question, i (question.id)}
		{#if formState.step === i}
			<div
				in:fly={{ x: 200, duration: 180, opacity: 0, delay: 180 }}
				out:fly={{ x: -200, duration: 180, opacity: 0 }}
			>
				{@render formStep(question)}
			</div>
		{/if}
	{/each}

	<!-- {#each QUESTIONS as question (question.id)} -->

	<!-- {@render formStep({ question, id, type })}
	{/each} -->

	{#if formState.error}
		<p class="text-red-500 text-sm tracking-wide">{formState.error}</p>
	{/if}
</main>

{#snippet formStep({ question, id, type })}
	<article>
		<div>
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState.answers[id]} class="px-2" />
		</div>
		<button
			onclick={() => nextStep(id)}
			class="rounded-lg shadow-lg ml-14 mb-6 mt-2 text-center px-6 py-2 border-none outline-none bg-blue-400 text-yellow-300 uppercase"
			>next</button
		>
	</article>
{/snippet}

{JSON.stringify(formState)}
