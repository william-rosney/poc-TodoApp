import http from '../src/http-common';

class TodoAppDataService {
	baseUrl = '/TodoTask';
	async getAll(userId) {
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

	async create(data) {
		try {
			const response = await http.post(`${this.baseUrl}/CreateTodo`, data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	async update(data) {
		try {
			const response = await http.put(`${this.baseUrl}/UpdateTodo`, data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}
	async updateStatus(data) {
		try {
			const response = await http.put(`${this.baseUrl}/UpdateTodoStatus`, data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	async delete(todoData) {
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
