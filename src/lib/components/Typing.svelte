<script lang="ts" context="module">
	export function wordPerSecond(word: string) {
		return (content) => (1000 * content.split(' ').length) / content.length / word;
	}
	export function msPerWord(ms = 1000) {
		return (content) => (wordPerSecond(1)(content) * ms) / 1000;
	}
	export function msPerLetter(ms = 20) {
		return ms;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let char = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./<>?:{}|+_)(*&^%$#@!~"';
	export let interval = wordPerSecond(1);
	export let ondone = () => {};
	export let done = false;
	export let randomizer = false;
	$: if (done) {
		ondone();
	}
	let content;
	let display = '';
	const random = {
		i: 0,
		start: false,
		toString() {
			if (!this.start) {
				return '';
			}
			if (done) {
				return '';
			}
			if (randomizer) {
				return randomizer();
			}
			return char[(Math.random() * char.length) | 0];
		}
	};
	let traillingHtmlTagLen = 0;
	const d = (ms) => new Promise((r) => setTimeout(r, ms));
	const typings = async () => {
		random.start = true;
		if (typeof interval == 'function') {
			interval = await interval(content);
		}
		const arr = content.split('');
		const reversed = content.split('').reverse();
		while (reversed.indexOf('>') == 0) {
			traillingHtmlTagLen += reversed.splice(0, reversed.indexOf('<') + 1).length;
		}
		let letter;
		while ((letter = arr.splice(0, 1)[0])) {
			display += letter;
			if (letter == '<') {
				const closer = arr.indexOf('>');
				display += arr.splice(0, closer).join('');
			}
			random.i++;
			await d(interval);
			if (arr.length < traillingHtmlTagLen) {
				done = true;
			}
			random.i++;
			await d(interval / 15);
			random.i++;
			await d(interval / 15);
			random.i++;
		}
	};

	onMount(() => {
		typings().then(ondone);
		return () => {};
	});
</script>

<div>
	<div style="outline: 0;" contenteditable="true" class:none={!done} bind:innerHTML={content}>
		<div contenteditable="false"><slot /></div>
	</div>
	{#if !done}
		<div>{@html display + random}</div>
	{/if}
</div>

<style>
	.none {
		display: none;
	}
</style>
