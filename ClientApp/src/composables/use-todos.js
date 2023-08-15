import { computed, nextTick, ref } from 'vue'
import TodoAppDataService from '../../services/TodoAppDataService';

const todos = ref([]);

export function useTodos() {
    async function getTodos() {
        try {
            console.log("getTodosAsync()")
            const response = await TodoAppDataService.getAll()
            todos.value = response.data;
            console.log(todos.value);
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
                await nextTick(getTodos());
            console.log(response.data);
        }catch (error)
        {
            console.log(error);
        }
    }

    async function deleteTodo(id){
        try {
            const response = await TodoAppDataService.delete(id);
            await nextTick(getTodos());
            console.log(response.data);
        }catch(error){
            console.log(error);
        };
    }

    async function updateTodo(newTodo){
        try {
            console.log(newTodo);
            const response = await TodoAppDataService.update(newTodo.id, newTodo);
            await nextTick(getTodos());
            console.log(response.data);

        } catch(error) {
          console.log(error);
        };
    }
    async function updateStatusTodo(newTodo){
        try {
            const response = await TodoAppDataService.updateStatus(newTodo.id, newTodo);
            await nextTick(getTodos());
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
        updateTodo,
        updateStatusTodo
    }
}