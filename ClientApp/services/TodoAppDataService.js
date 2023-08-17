import http from '../src/http-common';

class TodoAppDataService {
	async getAll() {
		try {
			const response = await http.get('/TodoTask');
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async get(id) {
		try {
			const response = await http.get(`/TodoTask/${id}`);
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async create(data) {
		try {
			const response = await http.post('/TodoTask', data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async update(id, data) {
		try {
			const response = await http.put(`/TodoTask/${id}`, data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
			return;
		}
	}
	async updateStatus(id, data) {
		try {
			const response = await http.put(`/TodoTask/updateStatus/${id}`, data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
			return;
		}
	}

	async delete(id) {
		try {
			const response = await http.delete(`/TodoTask/${id}`);
			console.log(response.data);
		} catch (error) {
			console.error(error);
			return;
		}
	}
}

export default new TodoAppDataService();
