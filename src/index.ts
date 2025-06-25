import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

import App from './App.vue';
import { vAdjustText } from './directives/adjustText';
import './index.css';

const app = createApp(App);
const pinia = createPinia();

app.directive('adjust-text', vAdjustText);
app.use(pinia);
app.mount('#root');
