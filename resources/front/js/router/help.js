export default [
    {
        path: '/help',
        component: () => import('../pages/Help/Help'),
        name: 'Help',
        beforeEnter(to, from, next) {
            //Store.dispatch('getContent');
            next()
        }
    }
]
