<template>
    <div class="todos-container">
        <label>To do</label>
        <ul class="todo-list">
            <li v-for="todo in uncompletedTodos" :key="todo.id">
                <TodoItem :todo="todo"/>
            </li>
        </ul>
        <label>completed</label>
        <ul class="todo-list">
            <li v-for="todo in completedTodos" :key="todo.id">
                <TodoItem :todo="todo"/>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useTodos } from '../composables/use-todos';
    import TodoItem from './TodoItem.vue';

    const { todos } = useTodos();
    
    const uncompletedTodos = computed(() => {
        return todos.value.filter(todo => !todo.isCompleted).sort((a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate));
    })
    const completedTodos = computed(() => {
        return todos.value.filter(todo => todo.isCompleted).sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
    });
</script>

<style scoped>
    .todos-container {        
        height: 85%;
        overflow-y: scroll;
        /* border: 1px solid red; */
    }

    label {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--primary-font-color);
        text-transform: uppercase;
        margin: 10px 0px;
    }
    .todo-list {
        list-style: none;
        padding: 0;
        margin: 0px;
    }
</style>