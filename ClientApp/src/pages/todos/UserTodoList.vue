<template>
	<div class="container">
		<TodoForm />
		<TodoList v-if="!isLoading" />
		<DataLoader
			class="data-loader"
			v-else />
	</div>
</template>

<script setup>
	import TodoForm from '../../components/Todo/TodoForm.vue';
	import TodoList from '../../components/Todo/TodoList.vue';
	import DataLoader from '../../components/Loader/DataLoader.vue';
	import { onMounted } from 'vue';
	import { useTodos } from '../../composables/use-todos';

	const { getTodos, isLoading } = useTodos();

	onMounted(() => {
		console.log('onMounted');
		getTodos();
	});
</script>

<style scoped>
	.container {
		width: 600px;
		height: 500px;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.data-loader {
		align-self: center;
		margin-top: 15%;
	}

	@media screen and (min-width: 768px) and (max-width: 1023px) {
	}
	@media screen and (max-width: 767px) {
		.container {
			margin-left: auto;
			margin-right: auto;
			width: 95%;
		}
	}
</style>
