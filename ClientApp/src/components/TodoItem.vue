<template>
    <div class="todo-container">
        <input type="checkbox" v-model="todo.isCompleted">
        <span :class="{completed: todo.isCompleted}" @click="() => isDialogOpened = true" >{{ todo.title }}</span>
        <button @click="deleteTodo">X</button>
        <UpdateTodoItemDialog v-if="isDialogOpened"
            :target-todo="{
                id: todo.id,
                title: todo.title,
                isCompleted: todo.isCompleted
            }" 
            :is-open="isDialogOpened"
            @update-todo="updateTodoAsync"
            @close="closeDialog" />
    </div>
</template>

<script setup>
import { computed, createApp, reactive, ref, watch } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
import { todos } from '../stores/todos';
import UpdateTodoItemDialog from './UpdateTodoItemDialog.vue';

    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true
        }
    });

    const todo = ref({...props});
    const emits = defineEmits(['update']);

    // const todo = computed(() => {
    //     return todos.value.find(todo => todo.id === props.todoId);
    // });

    const isDialogOpened = ref(false);
    function closeDialog(){
        console.log('CloseDialog() TodoItem')
        isDialogOpened.value = false;
    }

    watch(todo.value, (newTodo) => {
        console.log(newTodo);
        updateTodoAsync(newTodo);
    })

    async function updateTodoAsync(newTodo){
        try{
            todo.value = newTodo;
            console.log("updateTodoAsync() NEWTODO", newTodo);
            console.log("updateTodoAsync() TODO", todo.value);
            const response = await TodoAppDataService.update(newTodo.id, newTodo);
            emits('update');
            console.log(response.data);

        }catch(error) {
          console.log(error);
        };
    }

    async function deleteTodo(){
        try{
            const response = await TodoAppDataService.delete(todo.value.id);
            emits('update');
            console.log(response.data);
        }catch(error){
            console.log(error);
        };
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