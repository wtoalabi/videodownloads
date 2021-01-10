export default [
    {
        path: '/downloaded_videos',
        component: () => import('../pages/Downloaded/DownloadedVideos'),
        name: 'DownloadedVideos',
        beforeEnter(to, from, next) {
            //Store.dispatch('getContent');
            next()
        }
    }
]
