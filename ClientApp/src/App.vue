<template>
  <main>
    <TodoForm @update="updateTodoList" />
    <TodoList @update="updateTodoList" :todos="todos"/>
  </main>
</template>


<script setup>
    import TodoForm from './components/TodoForm.vue';
    import TodoList from './components/TodoList.vue';
    import TodoAppDataService from '../services/TodoAppDataService';
    import { ref, onMounted } from 'vue';

    const todos = ref([]);

    async function getTodosAsync(){
        try
        {
            console.log("getTodosAsync()")
            const response = await TodoAppDataService.getAll()
            const data = response.data;
            console.log(data);
            return data;

        }catch (error) 
        {
            console.log(error);
        }
    }

    async function updateTodoList(){
        console.log('UpdateTodoList()');
        await getTodosAsync().then(result => {
            console.log("getTodo.then()", result);
            todos.value = result;
        });
        console.log("TODOs", todos.value);
    }

    // async function addTodo(newTodo){
    //     try
    //     {
    //         console.log("newTodo", newTodo);
    //         const response = await TodoAppDataService.create(newTodo);
    //         getTodos().then(result => {
    //             todos.value = result;
    //         });
    //         console.log(response.data);
    //     }catch (error)
    //     {
    //         console.log(error);
    //     }
    // }

    // async function deleteTodo(){
    //     try{
    //         const response = await TodoAppDataService.delete(props.todoId);
    //         console.log(response.data);
    //     }catch(error){
    //         console.log(error);
    //     };
    // }

    onMounted(() => {
        console.log("onMounted");
        updateTodoList();
    })
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
