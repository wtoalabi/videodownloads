import Vue from 'vue'
window.Vue = Vue;
import Vuetify from './plugins/vuetify_main'
import VuetifyOptions from "./plugins/vuetify_options";
require('./bootstrap');
import store from './vuex'
import router from './router'
Vue.use(Vuetify);
window.prefixedURL = `${location.origin}/f-api`;
const app = new Vue({
    el: '#front',
    router,
    store,
    vuetify: new Vuetify(VuetifyOptions),
});
