import http from "../src/http-common";

class TodoAppDataService {
  getAll() {
    return http.get("/TodoTask");
  }

  get(id) {
    return http.get(`/TodoTask/${id}`);
  }

  create(data) {
    return http.post("/TodoTask", data);
  }

  update(id, data) {
    return http.put(`/TodoTask/${id}`, data);
  }

  delete(id) {
    return http.delete(`/TodoTask/${id}`);
  }

}

export default new TodoAppDataService();