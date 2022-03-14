<script setup lang="ts">
import { onMounted } from '@vue/composition-api';
import { useUserStore } from '@/stores/user';

const store = useUserStore();
onMounted(() => {
  store.fetchAccountInfo();
});
</script>

<template>
  <div class="home">
    <h1>This is an Home page - {{ store.username }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
