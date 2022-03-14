<script setup lang="ts">
import { onMounted } from 'vue-demi';
import { useMouse } from '@vueuse/core';
import { useUserStore } from '@/stores/user';

const { x, y } = useMouse();

const store = useUserStore();
onMounted(() => {
  store.fetchAccountInfo();
});
</script>

<template>
  <div class="home">
    <section class="section">
      <h1>This is an Home page - {{ store.username }}</h1>
      <p>{{ x }} / {{ y }}</p>
    </section>
  </div>
</template>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .section {
    width: 100%;
    text-align: center;
  }
}
</style>
