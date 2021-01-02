const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Aliases
 |--------------------------------------------------------------------------
 */
mix.setPublicPath('../../public/shared');
if (mix.inProduction()) {
    mix.webpackConfig({
        watchOptions: {
            ignored: /node_modules/,
        },
    }).version()
}
mix.webpackConfig({
    watchOptions: {
        ignored: /node_modules/,
    },
});
mix.js('../../resources/shared/js/shared.js', 'js')
    .extract(['lodash-es', 'axios', 'vuex', 'vue-router'],'vendors')
    .options({
        extractVueStyles: false,
    })
    .disableSuccessNotifications();
