import { computed, ref } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';

const todos = ref([]);
const sortedTodos = computed(() => {
	console.log("sortedTodo is updated", todos.value);
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
const isLoading = ref(true);

export function useTodos() {
	
	async function getTodos() {
		try {
			todos.value = await TodoAppDataService.getAll(1);
			isLoading.value = false;
			return todos.value;
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async function addTodo(newTodoTitle) {
		try {
			await TodoAppDataService.create({
				title: newTodoTitle,
				isCompleted: false,
				userId: 1
			});
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTodo(todo) {
		try {
			await TodoAppDataService.delete({
				id: todo.id,
				userId: todo.userId
			});
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function updateTodo(todo) {
		try {
			await TodoAppDataService.update({
				id: todo.id,
				title: todo.title,
				isCompleted: todo.isCompleted,
				userId: todo.userId

			});
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}
	async function updateStatusTodo(todo) {
		try {
			await TodoAppDataService.updateStatus({
				id: todo.id,
				title: todo.title,
				isCompleted: todo.isCompleted,
				userId: todo.userId
			});
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	return {
		todos,
		isLoading,
		uncompletedTodos,
		completedTodos,
		getTodos,
		addTodo,
		deleteTodo,
		updateTodo,
		updateStatusTodo,
	};
}
