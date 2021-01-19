export default [
    {
        path: '/twitter_downloads',
        component: () => import('../pages/TwitterDownloads/TwitterDownloads'),
        name: 'TwitterDownloads',
        beforeEnter(to, from, next) {
            //Store.dispatch('getContent');
            next()
        }
    }
]
