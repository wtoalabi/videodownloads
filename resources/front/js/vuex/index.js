import Vue from "vue";
import { Vuex} from '../../../shared/js/shared';
import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'
Vue.use(Vuex);

export  default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
});
