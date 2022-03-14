import { createApp, h } from 'vue-demi';
import { createPinia, PiniaVuePlugin } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/styles/app.scss';

const app = createApp({
  router,
  pinia: createPinia(),
  render: () => h(App)
});
app.use(PiniaVuePlugin);

app.mount('#app');
