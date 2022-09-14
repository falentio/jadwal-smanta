<script lang="ts">
	import { format, setDay, parse } from "date-fns";
	import { browser } from "$app/environment";
	import locale from "date-fns/locale/id/index.js";
	import Icon from "@iconify/svelte"
	export let currentDate = new Date()
	export let schedules = []
	export let displayText
	let day = currentDate.getDay()
	addDay(0)
	$: subjects = schedules
		.filter(s => s.day === day)
		.sort((a, b) => {
			const aDate = parse(a.startAt, "HH:mm", new Date())
			const bDate = parse(b.startAt, "HH:mm", new Date())
			return aDate > bDate ? 1 : -1
		})

	function addDay(n: number) {
		day += n
		day %= 7
		if (day < 0) {
			day += 7
		}
		if (!schedules.find(s => s.day === day)) {
			if (n >= 0) {
				addDay(1)
			} else {
				addDay(-1)
			}
		}
	}
</script>

<section class="flex flex-col flex-wrap justify-center w-full mx-auto bg-sky-300 ring-1 ring-black">
	<div class="text-xl md:text-2xl font-bold text-center flex-row flex justify-between items-center my-2">
		<button on:click={() => addDay(-1)} class="text-4xl md:text-6xl">
			<Icon icon="carbon:chevron-left" />
		</button>
		<h1> {format(setDay(currentDate, day), "eeee", { locale })} </h1>
		<button on:click={() => addDay(1)} class="text-4xl md:text-6xl"> 
			<Icon icon="carbon:chevron-right" />
		</button>
	</div>
	<ul class="divide-y divide-black ring-1 ring-black px-2 pt-4">
		{#each subjects as s}
			<li class="grid grid-cols-[auto_1fr] justify-end gap-2">
				<div class="truncate w-full">{displayText(s)}</div>
				<div class="w-max ml-auto">
					<span>{s.startAt}</span>
					<span>({s.duration} Menit)</span>
				</div>
			</li>
		{/each}
	</ul>
</section>