import Vue from 'vue';
import Store from "../vuex";
import {VueRouter} from "../../../shared/js/shared";
import help from "./help";
import downloaded_videos from "./downloaded_videos";
import extension from "./extension";

Vue.use(VueRouter.default);

const router = new VueRouter.default({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: () => import('../pages/Home/Home'),
            name: 'Home',
            beforeEnter(to, from, next) {
                //Store.dispatch('getContent');
                next()
            },
        },
        ...help,
        ...downloaded_videos,
        ...extension,
        {
            path: '*',
            component: () => import('../pages/NotFound/NotFound'),
            name: 'Not Found',
            beforeEnter(to, from, next) {
                //Store.dispatch('getContent');
                next()
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    Store.commit("resetQueryState");
    Store.commit('setTitle', to.name);
    /*Store.commit('setTitle', to.name)
    let urlBeforeLogin = window.localStorage.getItem('urlBeforeLogin');
    if (urlBeforeLogin) {
        window.localStorage.clear()
        this.default.push('/' + urlBeforeLogin.substr(2))
        Store.commit('message',{type:'success', text:'Logged in!'})
    }
    !_.isEmpty(Store.state.loggedInUser) ? Store.dispatch('checkIfStillLoggedIn'): ''*/

    next()
});

export default router
