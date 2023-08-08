<template>
    <form @submit.prevent="addTodo(newTodoTitle)">
        <input type="text" v-model="newTodoTitle">
        <button>Add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTodos } from '../composables/use-todos'

const { addTodo } = useTodos();
const newTodoTitle = ref('');

</script>