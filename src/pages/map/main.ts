import { createApp } from 'vue';
import App from './App';
import routes from './routes';
import "./style.less";

const app = createApp(App);
app.use(routes);
app.mount('#app');
