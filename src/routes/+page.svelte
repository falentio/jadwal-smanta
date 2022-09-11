<script lang="ts">
	import type { PageData } from "./$types"
	import Typing, { msPerLetter } from "$lib/components/Typing.svelte"
	export let data: PageData
	const bg = ["bg-green-600", "bg-yellow-300", "bg-red-600"]

	$: availableClass = data.availableClass
		.reduce((res, curr) => {
			const grade = getGrade(curr.split(" ")[0])
			const a = res[grade] ??= []
			a.push(curr)
			return res
		}, [])

	function getGrade(s: string) {
		switch (s) {
			case "XII": return 2
			case "XI": return 1
			case "X": return 0
			default: throw new Error("invalid grade")
		}
	}
</script>

<main class="container mx-auto">
	<section class="flex flex-col w-full p-2 gap-4">
		<h1 class="text-3xl md:text-5xl underline"> Jadwal Kelas </h1>
		<div class="flex-row flex gap-4">
			{#each availableClass as cc, i}
				<section class="flex-col flex">
					<h2 class="{bg[i]} text-center text-xl md:text-3xl capitalize rounded-t-md px-2 ring-1 ring-black"> kelas {i + 10} </h2>
					<ul class="flex flex-col bg-white rounded-b-md ring-1 ring-black py-1 h-full">
						{#each cc as c}
							<li class="w-full px-2">
								- <a href="/jadwal/{c.replace(/\s/gi, '-')}" class="underline text-blue-500"> {c} </a>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</section>
</main>