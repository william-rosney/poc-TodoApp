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
			todos.value = await TodoAppDataService.getAll();
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
			});
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTodo(id) {
		try {
			await TodoAppDataService.delete(id);
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function updateTodo(newTodo) {
		try {
			await TodoAppDataService.update(newTodo.id, newTodo);
			await getTodos();
		} catch (error) {
			console.log(error);
		}
	}
	async function updateStatusTodo(newTodo) {
		try {
			await TodoAppDataService.updateStatus(newTodo.id, newTodo);
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
