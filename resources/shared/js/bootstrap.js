import Vue from 'vue'
import {lodash,axios} from './shared';
window.Vue = Vue;
Vue.config.productionTip = false;
window._ = lodash.default;
window.axios = axios;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
require("./utils/Filters/GlobalFilters");
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
