import { ref } from 'vue'
import TodoAppDataService from '../../services/TodoAppDataService';

const todos = ref([]);

export function useTodos() {

    async function getTodos() {
        try {
            console.log("getTodosAsync()")
            const response = await TodoAppDataService.getAll()
            todos.value = response.data;
            return todos.value;
        } catch (error) {
            console.error(error);
            return
        }
    }

    async function addTodo(newTodoTitle){
        try
        {
            console.log("newTodo", newTodoTitle);
            const response = await TodoAppDataService.create(
                {
                    title: newTodoTitle, 
                    isCompleted: false
                });
            getTodos();
            console.log(response.data);
        }catch (error)
        {
            console.log(error);
        }
    }

    async function deleteTodo(id){
        try {
            const response = await TodoAppDataService.delete(id);
            getTodos();
        }catch(error){
            console.log(error);
        };
    }

    async function updateTodo(newTodo){
        try {
            const response = await TodoAppDataService.update(newTodo.id, newTodo);
            getTodos();
            console.log(response.data);

        } catch(error) {
          console.log(error);
        };
    }

    return {
        todos,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo
    }
}