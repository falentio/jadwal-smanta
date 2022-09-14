<script>
	import { page } from '$app/stores';
	import Typing, { wordPerSecond } from '$lib/components/Typing.svelte';
</script>

<div class="flex justify-center items-center h-screen text-center md:text-5xl">
	<Typing interval={wordPerSecond(12)}>
		ga ada apa apa di sini....<br />
		mending kembali ke halaman utama<br />
		<a href="/" class="text-blue-500 hover:text-blue-700">klik aku untuk kembali</a>
	</Typing>
</div>
{$page.error.message}
