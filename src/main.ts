import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { setupStore } from './store';
import router from './router';

createApp(App).use(router).use(store).mount('#app');
setupStore();
