import { computed, ref } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
import { useAuth } from './use-auth';

const todos = ref([]);
// const sortedTodos = computed(() => {
// 	console.log('sorted updated');
// 	return todos.value.sort(
// 		(a, b) => new Date(a.lastStatusUpdate) - new Date(b.lastStatusUpdate)
// 	);
// });

const uncompletedTodos = computed(() => {
	const newTodos = todos.value.filter((todo) => !todo.isCompleted).sort(
		(a, b) => new Date(a.lastStatusUpdate) - new Date(b.lastStatusUpdate)
	);
	console.log('uncompleted updated', newTodos);
	return newTodos;
});
const completedTodos = computed(() => {
	const newTodos = todos.value
		.filter((todo) => todo.isCompleted)
		.sort(
			(a, b) => new Date(a.lastStatusUpdate) - new Date(b.lastStatusUpdate)
		)
		.reverse();
	console.log('completed updated', newTodos);
	return newTodos;
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
		try {
			const newTodo = await TodoAppDataService.create({
				title: newTodoTitle,
				isCompleted: false,
				userId: userId.value,
			});
			todos.value.push(newTodo);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTodo(todo) {
		try {
			await TodoAppDataService.delete({
				id: todo.id,
				userId: todo.userId,
			});
			const todoIndex = todos.value.findIndex((_todo) => _todo.id === todo.id);
			todos.value.splice(todoIndex, 1);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateTodo(todo) {
		try {
			const updatedTodo = await TodoAppDataService.update({
				id: todo.id,
				title: todo.title,
				isCompleted: todo.isCompleted,
				userId: todo.userId,
			});
			const todoIndex = todos.value.findIndex((_todo) => _todo.id === todo.id);
			todos.value[todoIndex] = updatedTodo;
			console.log(todos.value);
		} catch (error) {
			console.log(error);
		}
		// await getTodos();
	}
	async function updateStatusTodo(todo) {
		try {
			const updatedTodo = await TodoAppDataService.updateStatus({
				id: todo.id,
				title: todo.title,
				isCompleted: todo.isCompleted,
				userId: todo.userId,
			});
			const todoIndex = todos.value.findIndex((_todo) => _todo.id === todo.id);
			todos.value[todoIndex] = updatedTodo;
			console.log(todos.value);
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
