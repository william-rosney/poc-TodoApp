<script setup>
    import TodoItem from './TodoItem.vue';
    import TodoAppDataService from '../../services/TodoAppDataService';
    import { onMounted, ref } from 'vue';
    import { todos } from '../stores/todos';



    async function getTodos(){
        try
        {
            const response = await TodoAppDataService.getAll()
            const data = response.data;
            console.log(data);
            return data;

        }catch (error) 
        {
            console.log(error);
        }
    }

    onMounted(() => {
        console.log("onMounted");
        getTodos().then(result => {
            todos.value = result;
        });
    })


</script>

<template>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <TodoItem :data="todo"/>
        </li>
    </ul>
</template>

<style scoped>
    ul {
        list-style-type: none;
    }
</style>../stores/todos