import Vue from 'vue';
import Store from "../vuex";
import {VueRouter} from "../../../shared/js/shared";
import help from "./help";
import downloaded_videos from "./downloaded_videos";
import twitter_downloads from "./twitter_downloads";

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
        ...twitter_downloads,
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
        let query = to.query;
        /*if (query.from_twitter  && from.name === null) {
            console.log(to.name," TO NAME INSIDE")
            Store.commit('setTwitterID', query.from_twitter);
            router.push("/twitter_downloads").then(_ => _);

        } else if (query === 'url') {
            console.log(2)
            Store.commit('saveIncomingURL', to.query.url)
        } else if(to.name !== 'Home') {
            console.log(3)
            router.push("/").then(_ => _);
        }else{
            console.log(4)
        }*/
//this.$store.commit("saveIncomingURL", this.$route.query.url)

        /*
        let urlBeforeLogin = window.localStorage.getItem('urlBeforeLogin');
        if (urlBeforeLogin) {
            window.localStorage.clear()
            this.default.push('/' + urlBeforeLogin.substr(2))
            Store.commit('message',{type:'success', text:'Logged in!'})
        }
        !_.isEmpty(Store.state.loggedInUser) ? Store.dispatch('checkIfStillLoggedIn'): ''*/

        next()
    }
);

export default router
