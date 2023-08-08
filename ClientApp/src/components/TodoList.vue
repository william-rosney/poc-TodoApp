<template>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <TodoItem :todo="todo"/>
        </li>
    </ul>
</template>

<script setup>
    import { useTodos } from '../composables/use-todos';
    import TodoItem from './TodoItem.vue';

    const { todos } = useTodos()

</script>

<style scoped>
    ul {
        list-style-type: none;
    }
</style>