import { createApp } from 'vue';
import App from './App';
import routes from './routes';
import "@/assets/font/font.css";

const app = createApp(App);
app.use(routes);
app.mount('#app');
