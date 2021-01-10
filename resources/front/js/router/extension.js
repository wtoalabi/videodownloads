export default [
    {
        path: '/extension',
        component: () => import('../pages/Extension/Extension'),
        name: 'Extension',
        beforeEnter(to, from, next) {
            //Store.dispatch('getContent');
            next()
        }
    }
]
