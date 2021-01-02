import Vue from "vue";

require('../../shared/js/bootstrap');

require("./utils/GlobalFilters");

Vue.component('index-wrapper', require('./pages/IndexWrapper.vue').default);
const files = require.context('./pages/', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)));

//window.prefixedURL = `${location.origin}/m-api`;
Vue.config.productionTip = false;
//require('./components/SupplierCodeSelection.vue').default
