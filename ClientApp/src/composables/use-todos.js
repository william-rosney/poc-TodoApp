import { computed, ref } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
import { useAuth } from './use-auth';

const todos = ref([]);
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

const isLoading = ref(true);
const { userId } = useAuth();

export function useTodos() {
	async function getTodos() {
		try {
			todos.value = await TodoAppDataService.getAll(userId.value);
			isLoading.value = false;
			return todos.value;
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async function addTodo(newTodoTitle) {
		await TodoAppDataService.create({
			title: newTodoTitle,
			isCompleted: false,
			userId: userId.value,
		});
		await getTodos();
	}

	async function deleteTodo(todo) {
		await TodoAppDataService.delete({
			id: todo.id,
			userId: todo.userId,
		});
		await getTodos();
	}

	async function updateTodo(todo) {
		await TodoAppDataService.update({
			id: todo.id,
			title: todo.title,
			isCompleted: todo.isCompleted,
			userId: todo.userId,
		});
		await getTodos();
	}
	async function updateStatusTodo(todo) {
		await TodoAppDataService.updateStatus({
			id: todo.id,
			title: todo.title,
			isCompleted: todo.isCompleted,
			userId: todo.userId,
		});
		await getTodos();
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
