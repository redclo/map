import "@/queenjs/ui/styles/index.less";
import "./style.less";
import "@/assets/webfonts/inter/stylesheet.css";
import "@/assets/font/font.css";

import { createApp } from 'vue';
import App from './App';
import routes from './routes';
const app = createApp(App);
app.use(routes);
app.mount('#app');
