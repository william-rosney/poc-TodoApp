<script setup>
import { ref, watch } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
import { todos } from '../stores/todos';

    const props = defineProps({
        data: {
            id: Number,
            title: String,
            isCompleted: Boolean,
        },


    })
    const title = ref(props.data.title)
    const isCompleted = ref(props.data.isCompleted);

    watch([isCompleted, title], ([newIsCompleted, newTitle]) => {
        updateTodo({
            id: props.data.id,
            title: newTitle,
            isCompleted: newIsCompleted
        })
    })

    async function updateTodo(newTodo){
        try{
            const response = await TodoAppDataService.update(newTodo.id, {title: newTodo.title, isCompleted: newTodo.isCompleted})
            console.log(response.data);

        }catch(error) {
          console.log(error);
        };
    }

    async function deleteTodo(){
        try{
            todos.value = todos.value.filter(todo => todo.id != props.data.id);
            const response = await TodoAppDataService.delete(props.data.id);
            console.log(response.data);
        }catch(error){
            console.log(error);
        };
    }
</script>

<template>
    <div class="todo-container">
        <input type="checkbox" v-model="isCompleted">
        <span :class="{completed: isCompleted}">{{ title }}</span>
        <button @click="deleteTodo">X</button>
    </div>
</template>

<style scoped>
    .todo-container{
        margin: 20px;
        border: 1px solid var(--vue-green);
        border-radius: 5px;
        padding: 10px;
    }
    .completed {
        text-decoration: line-through;
    }
    span{
        width: 100%;
    }
</style>