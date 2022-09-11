<script lang="ts">
	import Icon from "@iconify/svelte"
	let showNav = false
	let showMenu = false
	let scrollY
	let prev = [0, 0]
	$: prev = [prev.slice(1), scrollY]
	$: showNav = (prev[0] - prev[1]) > 0
</script>

<svelte:window bind:scrollY />
{#if showNav || showMenu}
	<div class="absolute w-full z-20 v pointer-events-none">
		<nav class="sticky top-0 relative w-full p-2">
			{#if showMenu}
				<div class="w-screen min-h-screen absolute bg-zinc-900/90 top-0 left-0 z-[500] fixed text-sky-500 pointer-events-auto">
					<section class="w-full mx-auto min-h-screen flex-col flex items-center mt-24" on:click={() => showMenu = false}>
						<h2 class="text-3xl md:text-5xl"><a href="/" class="underline">Home</a></h2>
					</section>
				</div>
			{:else}
				<div class="max-w-3xl mx-auto justify-end flex flex-row">
					<button class="bg-sky-300 border border-black w-12 h-12 p-2 flex justify-center items-center" on:click={() => showMenu = true}>
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