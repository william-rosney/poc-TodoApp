<script setup>
import { reactive } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
import { todos } from '../stores/todos';

    const newTodo = reactive({
        title: '',
        isCompleted: false
    });

    async function addTodo(){
        try
        {
            todos.value.push(newTodo);
            console.log("newTodo", newTodo);
            const response = await TodoAppDataService.create(newTodo);
            console.log(response.data);
        }catch (error)
        {
            console.log(error);
        }
    }
</script>
<template>
    <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo.title">
        <button>Add</button>
    </form>
</template>