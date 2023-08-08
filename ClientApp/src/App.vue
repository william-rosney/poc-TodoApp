<template>
  <main>
    <TodoForm @update="getTodos" />
    <TodoList @update="getTodos" :todos="todos"/>
  </main>
</template>


<script setup>
    import TodoForm from './components/TodoForm.vue';
    import TodoList from './components/TodoList.vue';
    import { onMounted } from 'vue';
    import { useTodos } from './composables/use-todos';

    const { todos, getTodos } = useTodos()

    onMounted(() => {
        console.log("onMounted");
        getTodos()
    })
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
