<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const ip = ref('')
const port = ref('')
const postData = ref('')

const nodeCount = ref(0)

const htmlData = ref('')

async function post() {}

async function get() {
	const res = '<h1>test</h1>'
	htmlData.value = res
}
</script>

<template>
	<div class="min-h-screen bg-slate-100">
		<div class="container mx-auto p-8 md:py-8 md:px-16 space-y-8">
			<section class="space-y-2">
				<h1 class="text-center text-4xl font-bold">Onion Routing</h1>
				<p class="text-center">By <i>Erlend Ryan</i> & <i>Erlend Matre</i></p>
			</section>
			<section class="grid grid-cols-2 gap-4 rounded-md">
				<div class="grid grid-cols-4 gap-4">
					<div class="col-start-1 col-span-3 md:col-span-2">
						<label for="ip">IP</label>
						<input class="shadow-lg w-full" type="text" id="ip" />
					</div>
					<div class="col-start-1 col-span-2 md:col-start-auto md:col-span-1">
						<label for="port">Port</label>
						<input class="shadow-lg w-full" type="number" id="port" />
					</div>
					<button
						@click="get"
						class="bg-slate-800 col-start-1 col-span-2 text-white shadow-lg p-2 rounded-md"
					>
						Get HTML
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
				<div class="grid grid-cols-8 w-full gap-4">
					<div class="col-start-1 col-span-3">
						<label for="postRequest">Post request</label>
						<input class="shadow-lg w-full" type="text" id="postRequest" />
					</div>
					<button
						@click="post"
						class="bg-slate-800 col-start-1 col-span-2 text-white shadow-lg p-2 rounded-md"
					>
						Send
					</button>
				</div>
			</section>
		</div>
	</div>
</template>
