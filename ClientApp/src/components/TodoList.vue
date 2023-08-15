<template>
	<div class="todos-container">
		<label>To do</label>
		<!-- <h2 v-if="isTodosEmpty">Your To do list is empty</h2> -->
		<TransitionGroup
			class="todo-list"
			tag="ol"
			name="todo-list">
			<li
				class="todo-item"
				v-for="todo in uncompletedTodos"
				:key="todo.id">
				<TodoItem :todo="todo" />
			</li>
		</TransitionGroup>
		<label>completed</label>
		<TransitionGroup
			class="todo-list"
			tag="ol"
			name="todo-list">
			<li
				class="todo-item"
				v-for="todo in completedTodos"
				:key="todo.id">
				<TodoItem :todo="todo" />
			</li>
		</TransitionGroup>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
	import { useTodos } from '../composables/use-todos';
	import TodoItem from './TodoItem.vue';

	const { todos } = useTodos();

	const isTodosEmpty = computed(() => {
		return !todos.value.length > 0;
	});

	const sortedTodos = computed(() => {
		return todos.value.sort(
			(a, b) => new Date(a.lastStatusUpdate) - new Date(b.lastStatusUpdate)
		);
	});

	const uncompletedTodos = computed(() => {
		return sortedTodos.value.filter((todo) => !todo.isCompleted);
	});

	const completedTodos = computed(() => {
		return sortedTodos.value.filter((todo) => todo.isCompleted).reverse();
	});
</script>

<style scoped>
	.todos-container {
		height: 85%;
		overflow-y: scroll;
		overflow-x: visible;
		padding: 1px;
		position: relative;
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
		padding: 5px;
		margin: 0px;
		/* height: 50%; */
	}
	.todo-item {
		display: flex;
		flex: 1 0 90%;
		align-items: center;
		padding: 0 15px 0 15px;
		margin-bottom: 10px;
		border: 1px solid #fff;
		border-radius: 4px;
		box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
		font-size: 1rem;
		font-weight: 400;
		color: #6a737d;
		width: auto;
		z-index: 10;
	}

	.todo-item:hover {
		border: 1px solid var(--primary-btn-color);
	}
	.todo-list-enter-active {
		animation: slide-in 0.8s ease-out;
	}
	.todo-list-leave-active {
		animation: slide-out 0.3s ease-in;
		position: absolute;
		width: 93%;
	}
	.todo-list-move {
		transition: all 0.8s ease;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0px);
		}
	}
	@keyframes slide-out {
		from {
			opacity: 1;
			transform: translateX(0px);
		}
		to {
			opacity: 0;
			transform: translateX(30px);
		}
	}
</style>
