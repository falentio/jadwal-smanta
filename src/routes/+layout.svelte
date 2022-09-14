<script>
	import '@fontsource/abel/400.css';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="relative">
	<Navbar />
	<div class="relative min-h-screen p-4 bg-gray-50">
		<slot />
	</div>
	<Footer />
</div>
