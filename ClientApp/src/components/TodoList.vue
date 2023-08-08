<template>
    <ul>
        <li v-for="todo in props.todos" :key="todo.id">
            <TodoItem @update="update" :id="todo.id" :title="todo.title" :is-completed="todo.isCompleted"/>
        </li>
    </ul>
</template>

<script setup>
    import TodoItem from './TodoItem.vue';
    import { onMounted, reactive, ref } from 'vue';

    const props = defineProps({
        todos: {
            type: Array,
            required: true
        }
    });
    const emits = defineEmits(['update']);
    console.log("TodoList todos", props.todos);

    async function update(){
        console.log("update() TodoList", );
        await emits('update');
    }

    // import { todos } from '../stores/todos';

    // const todos = ref([]);

    // async function getTodos(){
    //     try
    //     {
    //         const response = await TodoAppDataService.getAll()
    //         const data = response.data;
    //         console.log(data);
    //         return data;

    //     }catch (error) 
    //     {
    //         console.log(error);
    //     }
    // }


</script>


<style scoped>
    ul {
        list-style-type: none;
    }
</style>../stores/todos