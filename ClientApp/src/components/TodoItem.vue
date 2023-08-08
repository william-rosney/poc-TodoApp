<template>
    <div class="todo-container">
        <input type="checkbox" v-model="props.todo.isCompleted">
        <span :class="{completed: props.todo.isCompleted}" @click="() => isDialogOpened = true">{{ props.todo.title }}</span>
        <button @click="deleteTodo(props.todo.id)">X</button>
        <UpdateTodoDialog v-if="isDialogOpened"
            :target-todo="props.todo" 
            :is-open="isDialogOpened"
            @update-todo="updateTodo"
            @close="closeDialog" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import UpdateTodoDialog from './UpdateTodoDialog.vue';
import { useTodos } from '../composables/use-todos';

const { deleteTodo, updateTodo } = useTodos();

    const props = defineProps({
        todo: {
            type: Object,
            required: true
        }
    });

    watch(() => props.todo.isCompleted, () => {
        updateTodo(props.todo);
    })
    const isDialogOpened = ref(false);
    
    function closeDialog(){
        console.log('CloseDialog() TodoItem')
        isDialogOpened.value = false;
    }
    
</script>


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