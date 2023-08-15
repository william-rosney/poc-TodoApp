<template>
	<main>
		<div class="container">
			<TodoForm />
			<TodoList />
		</div>
	</main>
</template>

<script setup>
	import TodoForm from './components/TodoForm.vue';
	import TodoList from './components/TodoList.vue';
	import { onMounted } from 'vue';
	import { useTodos } from './composables/use-todos';


	const { getTodos } = useTodos();

	onMounted(() => {
		console.log('onMounted');
		getTodos();
	});
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
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
		margin-top: 10%;
		height: 500px;
	}
</style>
