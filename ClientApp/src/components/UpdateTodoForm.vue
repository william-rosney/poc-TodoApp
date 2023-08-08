<template>
    <form  @submit.prevent="saveUpdates">
            <input type="text" v-model="todo.title">
            <input type="text" />
            <button>Save</button>
        </form>
</template>

<script setup>
import { reactive } from 'vue';

    const todo = reactive({
        id: 0,
        title: ''
    })
</script>

<style scoped>
</style>