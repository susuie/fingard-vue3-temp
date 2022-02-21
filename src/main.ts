import { createApp } from 'vue';
import { globalRegister } from './global';
import App from './App.vue';
import store from './store';
import router from './router';

createApp(App).use(globalRegister).use(router).use(store).mount('#app');
