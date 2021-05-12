import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' 
import api from '../config.js'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'simplebar'
import '@fortawesome/fontawesome-free/css/all.css'; 
import '../src/assets/css/volt.css';
//import '../src/assets/js/volt.js';

import Axios from 'axios'
Axios.defaults.baseURL = api.base_url;



createApp(App).use(router).mount('#app')
