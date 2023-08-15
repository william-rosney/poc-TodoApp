<template>
	<div class="todos-container">
		<label>To do</label>
		<TransitionGroup
			class="todo-list"
			tag="ul"
			name="uncompleted">
			<li
				v-for="todo in uncompletedTodos"
				:key="todo.id">
				<TodoItem :todo="todo" />
			</li>
		</TransitionGroup>
		<label>completed</label>
		<ul class="todo-list">
			<li
				v-for="todo in completedTodos"
				:key="todo.id">
				<TodoItem :todo="todo" />
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import TodoItem from './TodoItem.vue';

	const todos = ref([
		{id:1, title:"test1", isCompleted: false},
		{id:2, title:"test2", isCompleted: false},
		{id:3, title:"test3", isCompleted: false},
		{id:4, title:"test4", isCompleted: false},
	])

	const uncompletedTodos = computed(() => {
		return todos.value.filter((todo) => !todo.isCompleted);
	});
	const completedTodos = computed(() => {
		return todos.value.filter((todo) => todo.isCompleted).reverse();
	});
</script>

<style scoped>
	.todos-container {
		height: 100%;
		overflow-y: scroll;
		/* border: 1px solid red; */
	}

	label {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--primary-font-color);
		text-transform: uppercase;
		margin: 10px 0px;
	}
	.todo-list {
		list-style: none;
		padding: 0;
		margin: 0px;
		height: 50%;

	}

	.uncompleted-enter-from {
		opacity: 0;
		transform: translateX(-30px);
	}
	.uncompleted-enter-to,
	.uncompleted-leave-from {
		opacity: 1;
		transform: translateX(0px);
	}
	.uncompleted-enter-active {
		transition: all 1s ease-out;
	}
	.uncompleted-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
	.uncompleted-leave-active {
		transition: all 0.8s ease-in;
		position: absolute;
	}
	.uncompleted-move {
		transition: all 0.8s ease;
		/* transition-delay: 0.3s; */
	}
</style>
