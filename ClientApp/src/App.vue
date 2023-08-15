<template>
	<main>
		<div class="container">
			<TodoForm />
			<TodoList v-if="!isLoading"/>
			<DataLoader class="data-loader" v-else/>
		</div>
	</main>
</template>

<script setup>
	import TodoForm from './components/TodoForm.vue';
	import TodoList from './components/TodoList.vue';
	import { onMounted } from 'vue';
	import { useTodos } from './composables/use-todos';
	import DataLoader from './components/Loader/DataLoader.vue';

	const { getTodos, isLoading } = useTodos();

	onMounted(() => {
		console.log('onMounted');
		getTodos();
	});
</script>

<style scoped>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f6f8fa;
	}

	.container {
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 20px;
		width: 600px;
		height: 500px;
		display: flex;
		flex-direction: column;
	}
	.data-loader {
		align-self: center;
		margin-top: 15%;

	}
</style>
