<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { parse, addHours } from 'date-fns';
	import SimpleSchedules from '$lib/components/SimpleSchedules.svelte';
	import FullSchedules from '$lib/components/FullSchedules.svelte';
	export let data;
	export let currentDate = new Date();
	let simple = true;
	let more = false;
	$: currentSchedules = data.schedules.filter((i) => currentDate.getDay() === i.day);
</script>

<section class="p-2 flex flex-col gap-8">
	<div class="relative select-none w-full md:w-1/2 mx-auto">
		<div class="ring-1 ring-black h-full w-full z-10 relative bg-sky-300 p-2 flex flex-col">
			<h1 class="text-3xl md:text-5xl text-center font-bold">
				Jadwal {$page.params.className.replace(/-/gi, ' ')}
			</h1>
			<form
				class="flex flex-col justify-center gap-1 max-h-0 transition-all ease-in-out duration-500 overflow-hidden h-20"
				class:max-h-20={more}
				on:submit|preventDefault
			>
				<div class="flex flex-row gap-2">
					<span> Mode: </span>
					<button class="bg-green-500 px-2 border border-black" on:click={() => (simple = !simple)}>
						{simple ? 'Simple' : 'Full'}</button
					>
				</div>
			</form>
			<button
				on:click={() => (more = !more)}
				class="mx-auto transition ease-in-out duration-500"
				class:rotate-180={more}
			>
				<Icon icon="ph:caret-double-down" />
			</button>
		</div>
		<div class="absolute -top-2 -left-2 bg-blue-600 ring-1 ring-black h-full w-full" />
	</div>
	{#if simple}
		<SimpleSchedules {currentDate} schedules={data.schedules} displayText={(s) => s.name} />
	{:else}
		<div class="relative select-none w-full md:w-1/2 mx-auto">
			<div class="w-full relative z-10">
				<FullSchedules {currentDate} schedules={data.schedules} displayText={(s) => s.name} />
			</div>
			<div class="absolute -top-2 -left-2 bg-blue-600 ring-1 ring-black h-full w-full" />
		</div>
	{/if}
</section>
