<script lang="ts">
	import Icon from "@iconify/svelte"
	import { browser } from "$app/environment"
	let showNav = false
	let showMenu = false
	let scrollY
	let prev = [0, 0]
	$: prev = [prev.slice(1), scrollY]
	$: showNav = (prev[0] - prev[1]) > 0 || scrollY === 0
	$: if (browser) {
		document.body.classList.toggle("noscroll", showMenu)
	}
</script>

<svelte:window bind:scrollY />
{#if showNav || showMenu}
	<div class="absolute w-full h-full z-20 p-4 pointer-events-none v">
		<nav class="w-full sticky top-4 ">
			{#if showMenu}
				<div class="w-screen bg-zinc-900/90 top-0 left-0 z-[500] fixed text-sky-500 pointer-events-auto">
					<section class="w-full min-h-screen sticky top-0 mx-auto flex-col flex items-center pt-24" on:click={() => showMenu = false}>
						<h2 class="text-3xl md:text-5xl"><a href="/" class="underline">Home</a></h2>
					</section>
				</div>
			{:else}
				<div class="max-w-3xl mx-auto justify-end flex flex-row">
					<button class="bg-sky-300 border border-black w-12 h-12 flex justify-center items-center" on:click={() => showMenu = true}>
						<Icon icon="mdi:menu" class="h-full w-full pointer-events-auto"/>
					</button>
				</div>
			{/if}
		</nav>
	</div>
{/if}

<style>
	div.v {
		animation-name: dig;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in-out;
	}

	@keyframes dig {
		0% {
			transform: translateY(-2.5rem);
		}

		100% {
			transform: translateY(0);
		}
	}
</style>