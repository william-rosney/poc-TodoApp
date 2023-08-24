import { computed, ref, type ComputedRef, type Ref } from 'vue';
import TodoAppDataService, {
	type DeleteTodo,
	type Todo,
	type UpdateTodo,
} from '../../services/TodoAppDataService';
import { useAuth } from './use-auth';

const todos: Ref<Todo[]> = ref([]);
// const sortedTodos = computed(() => {
// 	console.log('sorted updated');
// 	return todos.value.sort(
// 		(a, b) => new Date(a.lastStatusUpdate) - new Date(b.lastStatusUpdate)
// 	);
// });

const uncompletedTodos: ComputedRef<Todo[]> = computed((): Todo[] => {
	const newTodos: Todo[] = todos.value
		.filter((todo: Todo) => !todo.isCompleted)
		.sort(
			(a: Todo, b: Todo) =>
				new Date(a.lastStatusUpdate).getTime() -
				new Date(b.lastStatusUpdate).getTime()
		);
	console.log('uncompleted updated', newTodos);
	return newTodos;
});
const completedTodos: ComputedRef<Todo[]> = computed((): Todo[] => {
	const newTodos: Todo[] = todos.value
		.filter((todo: Todo) => todo.isCompleted)
		.sort(
			(a: Todo, b: Todo) =>
				new Date(a.lastStatusUpdate).getTime() -
				new Date(b.lastStatusUpdate).getTime()
		)
		.reverse();
	console.log('completed updated', newTodos);
	return newTodos;
});

const isLoading = ref<boolean>(true);
const { userId } = useAuth();

export function useTodos() {
	async function getTodos(): Promise<Todo[] | undefined> {
		try {
			console.log('getTodos', userId.value);
			todos.value = await TodoAppDataService.getAll(userId.value as number);
			isLoading.value = false;
			return todos.value;
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async function addTodo(newTodoTitle: string): Promise<void> {
		try {
			const newTodo: Todo | undefined = await TodoAppDataService.create({
				title: newTodoTitle,
				isCompleted: false,
				userId: userId.value as number,
			});
			todos.value.push(newTodo as Todo);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTodo(todo: DeleteTodo): Promise<void> {
		try {
			await TodoAppDataService.delete(todo);
			const todoIndex = todos.value.findIndex((_todo) => _todo.id === todo.id);
			todos.value.splice(todoIndex, 1);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateTodo(todo: UpdateTodo): Promise<void> {
		try {
			const updatedTodo = (await TodoAppDataService.update(todo)) as Todo;
			const todoIndex = todos.value.findIndex((_todo) => _todo.id === todo.id);
			todos.value[todoIndex] = updatedTodo;
			console.log(todos.value);
		} catch (error) {
			console.log(error);
		}
		// await getTodos();
	}
	async function updateStatusTodo(todo: UpdateTodo): Promise<void> {
		try {
			const updatedTodo = (await TodoAppDataService.updateStatus(todo)) as Todo;
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
