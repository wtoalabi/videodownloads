import Vue from "vue";
import { forage} from '../../shared/js/shared';
window.forage = forage.default;
require('../../shared/js/bootstrap');

require("./utils/GlobalFilters");

Vue.component('index-wrapper', require('./pages/IndexWrapper.vue').default);
const files = require.context('./pages/', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)));

//window.prefixedURL = `${location.origin}/m-api`;
Vue.config.productionTip = false;
//require('./components/SupplierCodeSelection.vue').default
