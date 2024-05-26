import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useCartStore } from '@/stores/cart';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const cartStore = useCartStore();
cartStore.initializeCart();

app.mount('#app');
