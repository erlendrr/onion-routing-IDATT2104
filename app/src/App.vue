<script setup lang="ts">
const nodeCount = 8
const htmlData = `
	<div>
		<h1>Hello</h1>
		<p>This is a test</p>
	</div>
`
</script>

<template>
	<div class="min-h-screen bg-slate-100">
		<div class="container mx-auto p-8 md:py-8 md:px-16 space-y-8">
			<h1 class="text-center text-4xl font-bold">Onion Routing</h1>
			<section class="grid grid-cols-2 gap-8 rounded-md">
				<div class="grid grid-cols-3 gap-4">
					<div class="col-start-1 col-span-2">
						<label for="ip">IP</label>
						<input class="shadow-lg w-full" type="text" id="ip" />
					</div>
					<div class="">
						<label for="port">Port</label>
						<input class="shadow-lg w-full" type="number" id="port" />
					</div>
					<button
						class="bg-slate-800 col-start-1 text-white shadow-lg p-2 rounded-md col-span-2 lg:col-span-1"
					>
						Load webiste
					</button>
				</div>
				<div>
					<div>
						<label>Node count:</label>
						<h3 class="text-lg font-bold">{{ nodeCount }}</h3>
					</div>
				</div>
			</section>
			<section class="flex flex-col items-start mx-auto">
				<label for="content">Content</label>
				<article id="content" class="bg-white shadow-xl w-full min-h-[200px]">
					<div class="prose" v-html="htmlData"></div>
				</article>
			</section>
			<section class="flex flex-col items-start mx-auto">
				<div class="grid grid-cols-4 w-full gap-4">
					<div class="col-start-1 col-span-2">
						<label for="postRequest">Post request</label>
						<input class="shadow-lg w-full" type="text" id="postRequest" />
					</div>
					<button
						class="bg-slate-800 col-start-1 text-white shadow-lg p-2 rounded-md"
					>
						Send
					</button>
				</div>
			</section>
		</div>
	</div>
</template>
