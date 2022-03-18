<script setup lang="ts">
const htmlData = `
	<div>
		<h1>Hello</h1>
		<p>This is a test</p>
	</div>
`
</script>

<template>
	<article v-html="htmlData" class="prose"></article>
</template>
