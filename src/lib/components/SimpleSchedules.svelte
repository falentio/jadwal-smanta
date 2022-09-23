<script lang="ts">
	import { format, setDay } from "date-fns";
	import locale from "date-fns/locale/id/index.js";
	export let currentDate = new Date()
	export let schedules = []
	export let displayText = s => s
	const weekday = Array.from({ length: 7 }, (_, i) => i + 1)
	$: _schedules = schedules
		.reduce((res, curr) => {
			const a = res[curr.day] ??= new Set()
			if (curr.teacher) {
				const d = displayText(curr)
				a.add(d)
			}
			return res
		}, [])
		.map(i => Array.from(i))
</script>

<ul class="grid grid-cols-2 md:grid-cols-3 auto-rows-fr justify-center w-max mx-auto px-2">
	{#each weekday as i (i)}
		{@const schedule = _schedules[i] || []}
		<li class="md:text-xl flex flex-col w-44">
			<section class="m-1 p-2 h-full rounded-md flex flex-col">
				<h2 
					class="text-xl md:text-3xl font-bold bg-sky-500 w-max px-2 rounded-md pb-8 shadow-xl"
				>
					<span> {format(setDay(new Date(), i), "eeee", { locale })} </span>
				</h2>
				<ul class="divide-y divide-black bg-sky-300 p-2 ml-2 -mt-8 rounded-md h-full">
					{#each schedule as s, i (s)}
						<li 
							class="text-sm md:text-md grid grid-cols-[auto_1fr] gap-2 auto-cols-max"
						> 
							<span class="w-max bg-sky-300">{i + 1}.</span>
							<span class="truncate">{s}</span>
						</li>
					{:else}
						<li class="text-sm"> Jadwal belum ada </li>
					{/each}
					<li></li>
				</ul>
			</section>
		</li>
	{/each}
</ul>

<style>
	ul > li.text-sm .over {
		animation-name: slide;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	@keyframes slide {
		0%, 20% {
			transform: translateX(0%);
			left: 0%;
		}
		80%, 100% {
			transform: translateX(-120%);
			left: 80%;
		}
	}
</style>