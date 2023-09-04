import http from '../src/http-common';
import type { CreateTodo, DeleteTodo, Todo, UpdateTodo } from '../src/types/todo-types';

class TodoAppDataService {
	baseUrl: string = '/TodoTask';
	async getAll(userId: number):Promise<Todo[] | undefined> {
		try {
			const response = await http.get(
				`${this.baseUrl}/GetUserTodoList/${userId}`
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async create(todoData: CreateTodo): Promise<Todo | undefined> {
		try {
			const response = await http.post(`${this.baseUrl}/CreateTodo`, todoData);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async update(todoData: UpdateTodo): Promise<Todo | undefined> {
		try {
			const response = await http.put(`${this.baseUrl}/UpdateTodo`, todoData);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
	async updateStatus(todoData: UpdateTodo): Promise<Todo | undefined> {
		try {
			const response = await http.put(
				`${this.baseUrl}/UpdateTodoStatus`,
				todoData
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	async delete(todoData: DeleteTodo): Promise<void> {
		try {
			const response = await http.delete(`${this.baseUrl}/DeleteTodo`, {
				data: todoData,
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}
}

export default new TodoAppDataService();
