import http from '../src/http-common';

export interface Todo {
	id: number;
	title: string;
	isCompleted: boolean;
	userId: number;
	lastUpdate: Date;
	lastStatusUpdate: Date;
}

export interface CreateTodo {
	title: string;
	isCompleted: boolean;
	userId: number;
}

export interface UpdateTodo {
	id: number;
	title: string;
	isCompleted: boolean;
	userId: number;
}

export interface DeleteTodo {
	id: number;
	userId: number;
}
class TodoAppDataService {
	baseUrl = '/TodoTask';
	async getAll(userId: number) {
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
