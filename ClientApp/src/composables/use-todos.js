import { ref } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';

const todos = ref([]);
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
		getTodos,
		addTodo,
		deleteTodo,
		updateTodo,
		updateStatusTodo,
	};
}
