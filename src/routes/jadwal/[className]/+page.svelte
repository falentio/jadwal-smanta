<script lang="ts">
	import { slide } from "svelte/transition"
	import { page } from "$app/stores"
	import { parse, addHours } from "date-fns"
	import SchedulesCollections from '$lib/components/SchedulesCollections.svelte'
	export let data
	export let currentDate = new Date()
	let simple = true
	let more = false

	$: currentSchedules = data.schedules.filter(i => currentDate.getDay() === i.day)
</script>

<section class="p-2 flex flex-col gap-4">
	<div class="relative select-none w-full md:w-1/2 mx-auto">
		<div class="ring-1 ring-black h-full w-full z-10 relative bg-sky-300 p-2 flex flex-col"> 
			<h1 class="text-3xl md:text-5xl text-center font-bold">Jadwal {$page.params.className.replace(/-/gi, " ")}</h1>
			{#if more}
				<form 
					transition:slide
					class="flex flex-col gap-1" 
					on:submit|preventDefault
				>
					<div class="flex flex-row gap-2">
						<span> Mode: </span>
						<button class="bg-green-500 px-2 border border-black" on:click={() => simple = !simple}> {simple ? "Simple" : "Full" }</button>
					</div>
				</form>
			{/if}
			<button on:click={() => more = !more} class="hidden"> 
				More 
			</button>
		</div>
		<div class="absolute -top-2 -left-2 bg-zinc-800 h-full w-full"></div>
	</div>
	<div class="relative w-2/3 mx-auto md:w-2/6 hidden">
		<form
			on:submit|preventDefault
			class="ring-1 ring-black w-full h-full z-10 relative bg-sky-300 p-2"
		>
			<div class="flex flex-row gap-2">
				<label> Mode: </label>
				<button class:bg-red-400={simple} type="button" on:click={() => simple = true}> simple </button>
				<button class:bg-red-400={!simple} type="button" on:click={() => simple = false}> full </button>
			</div>
		</form>
		<div class="absolute -top-1 -left-1 bg-zinc-800 h-full w-full"></div>
	</div>
	<SchedulesCollections {currentDate} schedules={data.schedules}/>
</section>